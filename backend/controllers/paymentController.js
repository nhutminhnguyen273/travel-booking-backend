const { default: mongoose } = require("mongoose");
const PaymentService = require("../services/PaymentService");

class PaymentController {
    async createVNPayPayment(req, res) {
        try {
            const { bookingId, amount } = req.body;
            const userId = req.user.id;
            const paymentData = {
                bookingId,
                amount,
                userId
            };
            const paymentUrl = await PaymentService.createVNPayPayment(paymentData);
            res.status(200).json({ success: true, paymentUrl });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }

    async vnpayReturn(req, res) {
        try {
            const result = await PaymentService.processVNPayReturn(req.query);
            res.status(200).json(result);
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    }
}

module.exports = new PaymentController();