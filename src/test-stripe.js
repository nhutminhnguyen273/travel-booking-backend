// Test file to check Stripe configuration
require('dotenv').config();
const Stripe = require('stripe');

console.log('Testing Stripe configuration...');
console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
console.log('STRIPE_SECRET_KEY length:', process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.length : 0);
console.log('STRIPE_SECRET_KEY first 10 chars:', process.env.STRIPE_SECRET_KEY ? process.env.STRIPE_SECRET_KEY.substring(0, 10) + '...' : 'N/A');

try {
    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16'
    });
    
    console.log('Stripe initialized successfully');
    
    // Test creating a payment intent
    stripe.paymentIntents.create({
        amount: 1000,
        currency: 'usd',
        metadata: { test: true }
    })
    .then(paymentIntent => {
        console.log('Payment intent created successfully:', paymentIntent.id);
        process.exit(0);
    })
    .catch(error => {
        console.error('Error creating payment intent:', error.message);
        process.exit(1);
    });
} catch (error) {
    console.error('Error initializing Stripe:', error.message);
    process.exit(1);
} 