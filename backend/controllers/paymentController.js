const PaymentService = require('../services/paymentService');

class PaymentController {
    async makePayment(req, res) {
        try {
            const { bookingId, paymentMethod, transactionId, amount } = req.body;
            const payment = await PaymentService.processPayment(bookingId, paymentMethod, transactionId, amount);
            res.status(201).json({ message: "Thành công", data: payment });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi thanh toán", error: error.message });
        }
    }

    async confirmPayment(req, res) {
        try {
            const { transactionId } = req.body;
            const payment = await PaymentService.confirmPayment(transactionId);
            res.status(200).json({ message: "Xác nhận thanh toán thành công", data: payment });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xác nhận thanh toán", error: error.message });
        }
    }

    async getPaymentByBooking(req, res) {
        try {
            const { bookingId } = req.params;
            const payment = await PaymentService.getPaymentByBookingId(bookingId);
            res.status(200).json({ message: "Lấy thông tin thanh toán thành công", data: payment });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy thông tin thanh toán", error: error.message });
        }
    }
}

module.exports = new PaymentController();