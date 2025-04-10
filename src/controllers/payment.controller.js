const PaymentService = require("../services/payment.service");

class PaymentController {
    async createPayment(req, res) {
        try {
            const { bookingId, amount } = req.body;
            const userId = req.user.id;
            
            const payment = await PaymentService.createPayment({
                bookingId,
                amount,
                userId
            });

            res.status(200).json({
                message: "Payment intent created successfully",
                data: payment
            });
        } catch (error) {
            res.status(500).json({
                message: "Error creating payment",
                error: error.message
            });
        }
    }

    async handleWebhook(req, res) {
        try {
            const signature = req.headers['stripe-signature'];
            const result = await PaymentService.handleWebhook(signature, req.body);
            res.json(result);
        } catch (error) {
            res.status(400).json({
                message: "Webhook error",
                error: error.message
            });
        }
    }

    async getPaymentHistory(req, res) {
        try {
            const userId = req.user.id;
            const history = await PaymentService.getPaymentHistory(userId);
            res.status(200).json({
                message: "Payment history retrieved successfully",
                data: history
            });
        } catch (error) {
            res.status(500).json({
                message: "Error retrieving payment history",
                error: error.message
            });
        }
    }
}

module.exports = new PaymentController();