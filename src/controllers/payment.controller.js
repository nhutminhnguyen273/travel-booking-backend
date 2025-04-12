const PaymentService = require("../services/payment.service");

class PaymentController {
    async createPayment(req, res) {
        try {
            const { bookingId, amount, method } = req.body;
            const userId = req.user.id;
            
            console.log("Payment request data:", { bookingId, amount, method, userId });
            
            // Validate required fields
            if (!bookingId || !userId) {
                return res.status(400).json({
                    message: "Lỗi",
                    error: "Thiếu thông tin booking hoặc user"
                });
            }
            
            // Tạo payment intent với Stripe
            const paymentIntent = await PaymentService.createPayment({
                bookingId,
                amount,
                userId,
                paymentMethod: method || "stripe"
            });

            console.log("Payment intent created:", paymentIntent);

            // Tạo bản ghi payment trong database
            const payment = await PaymentService.createPaymentRecord({
                user: userId,
                booking: bookingId,
                amount,
                method: method || "stripe",
                status: "pending",
                transactionId: paymentIntent.transactionId
            });

            res.status(200).json({
                message: "Tạo thanh toán thành công",
                data: {
                    clientSecret: paymentIntent.clientSecret,
                    payment
                }
            });
        } catch (error) {
            console.error("Payment creation error:", error);
            res.status(500).json({
                message: "Lỗi",
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