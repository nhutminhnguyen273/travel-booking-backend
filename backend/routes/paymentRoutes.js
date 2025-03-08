const express = require("express");
const PaymentController = require("../controllers/paymentController");
const Middleware = require('../middleware/middleware');
const router = express.Router();

router.post("/vnpay", Middleware.verifyToken, PaymentController.createPaymentURL);
router.get("/vnpay_return", PaymentController.handleVNPayReturn);

module.exports = router;