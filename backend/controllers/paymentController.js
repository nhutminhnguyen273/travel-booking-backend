const PaymentService = require('../services/paymentService');

class PaymentController {
    async makePayment(req, res) {
        try {
            const { bookingId, paymentMethod, transactionId, amount } = req.body;
            const payment = await PaymentService.processPayment(bookingId, paymentMethod, transactionId, amount);
            res.status(201).json({ success: true, data: payment });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async confirmPayment(req, res) {
        try {
            const { transactionId } = req.body;
            const payment = await PaymentService.confirmPayment(transactionId);
            res.status(200).json({ success: true, data: payment });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getPaymentByBooking(req, res) {
        try {
            const { bookingId } = req.params;
            const payment = await PaymentService.getPaymentByBookingId(bookingId);
            res.status(200).json({ success: true, data: payment });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new PaymentController();