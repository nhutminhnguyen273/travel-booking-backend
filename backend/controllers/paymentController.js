const qs = require('qs');
const crypto = require('crypto');
const PaymentService = require('../services/paymentService');
const vnpayConfig = require('../config/vnpayConfig');

class PaymentController {
    async makePayment(req, res) {
        try {
            const { bookingId, paymentMethod, transactionId, amount } = req.body;
            const payment = await PaymentService.processPayment(bookingId, paymentMethod, transactionId, amount);
            res.status(201).json({ message: "Thành công", data: payment });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi thanh toán", error: error.message });
        }
    }

    async confirmPayment(req, res) {
        try {
            const { transactionId } = req.body;
            const payment = await PaymentService.confirmPayment(transactionId);
            res.status(200).json({ message: "Xác nhận thanh toán thành công", data: payment });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xác nhận thanh toán", error: error.message });
        }
    }

    async getPaymentByBooking(req, res) {
        try {
            const { bookingId } = req.params;
            const payment = await PaymentService.getPaymentByBookingId(bookingId);
            res.status(200).json({ message: "Lấy thông tin thanh toán thành công", data: payment });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy thông tin thanh toán", error: error.message });
        }
    }

    async createVNPayPayment(req, res) {
        try {
            const { bookingId, amount } = req.body;
            const ipAddr = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

            const vnp_Params = {
                vnp_Version: "2.1.0",
                vnp_Command: "pay",
                vnp_TmnCode: vnpayConfig.vnp_TmnCode,
                vnp_Locale: "vn",
                vnp_CurrCode: "VND",
                vnp_TxnRef: Date.now().toString(), // Mã giao dịch duy nhất
                vnp_OrderInfo: `Thanh toan booking ${bookingId}`,
                vnp_OrderType: "other",
                vnp_Amount: amount * 100, // VNPay yêu cầu đơn vị VNĐ * 100
                vnp_ReturnUrl: vnpayConfig.vnp_ReturnUrl,
                vnp_IpAddr: ipAddr,
                vnp_CreateDate: new Date().toISOString().slice(0, 19).replace(/[-T:]/g, ''),
            };

            // Tạo signature để bảo mật dữ liệu gửi đi
            const sortedParams = Object.keys(vnp_Params).sort().reduce((acc, key) => {
                acc[key] = vnp_Params[key];
                return acc;
            }, {});

            const signData = qs.stringify(sortedParams, { encode: false });
            const hmac = crypto.createHmac("sha512", vnpayConfig.vnp_HashSecret);
            const signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");

            sortedParams["vnp_SecureHash"] = signed;
            const vnpUrl = `${vnpayConfig.vnp_Url}?${qs.stringify(sortedParams, { encode: false })}`;

            // Lưu thông tin thanh toán vào DB (PENDING)
            await PaymentService.processPayment(bookingId, "VNPAY", vnp_Params.vnp_TxnRef, amount);

            res.json({ success: true, paymentUrl: vnpUrl });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async vnpayReturn(req, res) {
        try {
            const vnp_Params = req.query;
            const secureHash = vnp_Params["vnp_SecureHash"];
            delete vnp_Params["vnp_SecureHash"];
            delete vnp_Params["vnp_SecureHashType"];

            const sortedParams = Object.keys(vnp_Params).sort().reduce((acc, key) => {
                acc[key] = vnp_Params[key];
                return acc;
            }, {});

            const signData = qs.stringify(sortedParams, { encode: false });
            const hmac = crypto.createHmac("sha512", vnpayConfig.vnp_HashSecret);
            const signed = hmac.update(new Buffer.from(signData, 'utf-8')).digest("hex");

            if (secureHash === signed) {
                if (vnp_Params["vnp_ResponseCode"] === "00") {
                    await PaymentService.confirmPayment(vnp_Params["vnp_TxnRef"]);
                    return res.redirect("http://localhost:3000/payment-success");
                } else {
                    return res.redirect("http://localhost:3000/payment-fail");
                }
            } else {
                return res.status(400).json({ success: false, message: "Invalid signature" });
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new PaymentController();