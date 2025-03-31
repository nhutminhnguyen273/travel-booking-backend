const PaymentService = require("../services/payment.service");

class PaymentController {
    async createPaymentURL(req, res) {
        try {
            const { bookingId, amount } = req.body;
            const paymentUrl = await PaymentService.createVNPay({ bookingId, amount });
            res.status(200).json({
                message: "Tạo cổng thanh toán thành công!",
                data: paymentUrl
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async handleVNPayReturn(req, res) {
        try {
            const result = await PaymentService.handleVNPayReturn(req.query);
            res.status(200).json({
                message: "Trả về cổng thanh toán thành công!",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }
}

module.exports = new PaymentController();