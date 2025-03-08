const PaymentRepository = require('../repositories/paymentRepository');
const BookingRepository = require('../repositories/bookingRepository');
const qs = require('qs');
const crypto = require("crypto");
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

class PaymentService {
    async createVNPayPayment({ bookingId, userId, amount }) {
        const tmnCode = process.env.VNP_TMNCODE;
        const secretKey = process.env.VNP_HASHSECRET;
        const vnpUrl = process.env.VNP_URL;
        const returnUrl = process.env.VNP_RETURN_URL;

        // Kiểm tra giá trị hợp lệ
        // if (!bookingId || !user || !amount) {
        //     throw new Error("Thiếu thông tin bookingId, user hoặc amount.");
        // }

        if (isNaN(amount) || amount <= 0) {
            throw new Error("Số tiền thanh toán không hợp lệ.");
        }

        // Tạo order ID duy nhất
        const orderId = Date.now().toString();

        // Định dạng ngày tháng (YYYYMMDDHHmmss)
        const createDate = new Date();
        const formattedDate = `${createDate.getFullYear()}${("0" + (createDate.getMonth() + 1)).slice(-2)}${(
            "0" + createDate.getDate()
        ).slice(-2)}${("0" + createDate.getHours()).slice(-2)}${("0" + createDate.getMinutes()).slice(-2)}${(
            "0" + createDate.getSeconds()
        ).slice(-2)}`;

        // Dữ liệu gửi đến VNPay
        let vnp_Params = {
            vnp_Version: "2.1.0",
            vnp_Command: "pay",
            vnp_TmnCode: tmnCode,
            vnp_Amount: amount * 100, // VNPay yêu cầu số tiền nhân 100
            vnp_CurrCode: "VND",
            vnp_TxnRef: orderId,
            vnp_OrderInfo: `Thanh toán đặt tour #${bookingId}`,
            vnp_OrderType: "billpayment",
            vnp_Locale: "vn",
            vnp_ReturnUrl: returnUrl,
            vnp_CreateDate: formattedDate,
        };

        // Sắp xếp params theo thứ tự alphabet
        vnp_Params = Object.fromEntries(Object.entries(vnp_Params).sort());

        // Tạo chuỗi ký
        const signData = qs.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

        // Gán signature vào params
        vnp_Params["vnp_SecureHash"] = signed;

        // Tạo URL thanh toán
        const paymentUrl = `${vnpUrl}?${qs.stringify(vnp_Params)}`;

        await PaymentRepository.createPayment({
            booking: new mongoose.Types.ObjectId(bookingId),
            user: new mongoose.Types.ObjectId(userId),
            amount,
            paymentMethod: "VNPay",
            transactionId: orderId,
            paymentStatus: "Pending"
        });        

        return paymentUrl;
    }

    async processVNPayReturn(query) {
        const secretKey = process.env.VNP_HASHSECRET;
        const receivedHash = query["vnp_SecureHash"];
        delete query["vnp_SecureHash"];
        delete query["vnp_SecureHashType"];

        // Sắp xếp và tạo chuỗi ký
        const sortedParams = Object.fromEntries(Object.entries(query).sort());
        const signData = qs.stringify(sortedParams, { encode: false });

        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

        if (signed !== receivedHash) {
            throw new Error("Chữ ký không hợp lệ.");
        }

        const transactionId = query["vnp_TxnRef"];
        const responseCode = query["vnp_ResponseCode"];

        if (responseCode === "00") {
            await PaymentRepository.updatePayment(transactionId, { paymentStatus: "Paid", paidAt: new Date() });
            return { success: true, message: "Thanh toán thành công" };
        } else {
            await PaymentRepository.updatePayment(transactionId, { paymentStatus: "Failed" });
            return { success: false, message: "Thanh toán thất bại" };
        }
    }
}
module.exports = new PaymentService();