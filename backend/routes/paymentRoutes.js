const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/PaymentController");
const Middleware = require('../middleware/middleware');

router.post("/vnpay", Middleware.verifyToken, PaymentController.createVNPayPayment);
router.get("/vnpay-return", PaymentController.vnpayReturn);

module.exports = router;