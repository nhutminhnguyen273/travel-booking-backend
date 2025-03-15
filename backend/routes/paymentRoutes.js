const express = require("express");
const PaymentController = require("../controllers/paymentController");
const Middleware = require('../middleware/middleware');
const router = express.Router();

// Authenticated routes
router.post("/vnpay", Middleware.verifyToken, PaymentController.createPaymentURL);

// Public route (để nhận callback từ VNPay)
router.get("/vnpay_return", PaymentController.handleVNPayReturn);

module.exports = router;