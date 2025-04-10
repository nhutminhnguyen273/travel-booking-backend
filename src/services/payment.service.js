const History = require("../models/history.model");
const PaymentStatus = require("../enums/payment-status.enum");
const PaymentMethod = require("../enums/payment-method.enum");
const Stripe = require("stripe");

class PaymentService {
    async createPayment({ bookingId, amount, userId }) {
        try {
            console.log("Creating payment with Stripe...");
            
            // Initialize Stripe directly in the service
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
                apiVersion: '2023-10-16'
            });
            
            // Create a payment intent
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(amount * 100),
                currency: "usd",
                metadata: {
                    bookingId,
                    userId
                }
            });

            console.log("Payment intent created:", paymentIntent.id);

            // Create payment history record
            const history = new History({
                user: userId,
                booking: bookingId,
                amount,
                paymentMethod: PaymentMethod.Stripe,
                status: PaymentStatus.Pending,
                transactionId: paymentIntent.id,
                metadata: {
                    clientSecret: paymentIntent.client_secret
                }
            });
            await history.save();

            return {
                clientSecret: paymentIntent.client_secret
            };
        } catch (error) {
            console.error("Error creating payment:", error);
            throw error;
        }
    }

    async handleWebhook(signature, payload) {
        try {
            // Initialize Stripe directly in the service
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
                apiVersion: '2023-10-16'
            });
            
            const event = stripe.webhooks.constructEvent(
                payload,
                signature,
                process.env.STRIPE_WEBHOOK_SECRET
            );

            switch (event.type) {
                case 'payment_intent.succeeded':
                    await this.handlePaymentSuccess(event.data.object);
                    break;
                case 'payment_intent.payment_failed':
                    await this.handlePaymentFailure(event.data.object);
                    break;
            }

            return { received: true };
        } catch (error) {
            console.error("Error handling webhook:", error);
            throw error;
        }
    }

    async handlePaymentSuccess(paymentIntent) {
        const history = await History.findOne({ transactionId: paymentIntent.id });
        if (history) {
            history.status = PaymentStatus.Paid;
            history.paymentDate = new Date();
            await history.save();
        }
    }

    async handlePaymentFailure(paymentIntent) {
        const history = await History.findOne({ transactionId: paymentIntent.id });
        if (history) {
            history.status = PaymentStatus.Cancelled;
            await history.save();
        }
    }

    async getPaymentHistory(userId) {
        return await History.find({ user: userId })
            .populate('booking')
            .sort({ createdAt: -1 });
    }
}

module.exports = new PaymentService();