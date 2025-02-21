const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/paymentController');
const Middleware = require('../config/middleware');

router.post('/make', Middleware.verifyToken, PaymentController.makePayment);
router.put('/confirm', Middleware.verifyToken, PaymentController.confirmPayment);
router.get('/booking/:bookingId', Middleware.verifyToken, PaymentController.getPaymentByBooking);

module.exports = router;
