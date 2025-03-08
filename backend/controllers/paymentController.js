const PaymentService = require("../services/paymentService");

class PaymentController {
    async createPaymentURL(req, res) {
        try {
            const { bookingId, amount } = req.body;
            const paymentUrl = await PaymentService.createVNPayPayment({ bookingId, amount });
            res.json({ success: true, paymentUrl });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async handleVNPayReturn(req, res) {
        try {
            const result = await PaymentService.handleVNPayReturn(req.query);
            res.json(result);
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new PaymentController();