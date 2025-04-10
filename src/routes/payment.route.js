const router = require("express").Router();
const PaymentController = require("../controllers/payment.controller");
const Middleware = require("../middleware/middleware");

// Test route to check Stripe configuration
router.get("/test-config", (req, res) => {
    try {
        const config = {
            hasSecretKey: !!process.env.STRIPE_SECRET_KEY,
            hasPublicKey: !!process.env.STRIPE_PUBLIC_KEY,
            hasWebhookSecret: !!process.env.STRIPE_WEBHOOK_SECRET,
            secretKeyLength: process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.length : 0,
            publicKeyLength: process.env.STRIPE_PUBLIC_KEY ? process.env.STRIPE_PUBLIC_KEY.length : 0
        };
        
        res.status(200).json({
            message: "Stripe configuration check",
            data: config
        });
    } catch (error) {
        res.status(500).json({
            message: "Error checking Stripe configuration",
            error: error.message
        });
    }
});

// Create payment intent
router.post("/create", Middleware.verifyToken, PaymentController.createPayment);

// Handle Stripe webhook
router.post("/webhook", PaymentController.handleWebhook);

// Get payment history
router.get("/history", Middleware.verifyToken, PaymentController.getPaymentHistory);

module.exports = router;