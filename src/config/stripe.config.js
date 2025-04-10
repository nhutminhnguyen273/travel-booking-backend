const dotenv = require("dotenv").config();
const Stripe = require("stripe");

// Get the secret key from environment variables
const secretKey = process.env.STRIPE_SECRET_KEY;

// Validate required configurations
if (!secretKey) {
    throw new Error("Missing required Stripe configuration: STRIPE_SECRET_KEY");
}

// Initialize Stripe with the secret key
const stripe = new Stripe(secretKey, {
    apiVersion: '2023-10-16' // Use the latest API version
});

const stripeConfig = {
    stripe,
    currency: "usd",
    successUrl: process.env.STRIPE_SUCCESS_URL || "http://localhost:5173/payment/success",
    cancelUrl: process.env.STRIPE_CANCEL_URL || "http://localhost:5173/payment/cancel"
};

module.exports = stripeConfig; 