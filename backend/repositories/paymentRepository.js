const PaymentModel = require('../models/paymentModel');

class PaymentRepository {
    async createPayment(paymentData) {
        try {
            const payment = new PaymentModel(paymentData);
            return await payment.save();
        } catch (error) {
            throw new Error(`Lỗi khi tạo thanh toán: ${error.message}`);
        }
    }

    async getPaymentByBookingId(bookingId) {
        return await PaymentModel.findOne({ bookingId });
    }

    async getPaymentByTransactionId(transactionId) {
        return await PaymentModel.findOne({ transactionId });
    }

    async updatePaymentStatus(paymentId, updateData) {
        return await PaymentModel.findByIdAndUpdate(paymentId, updateData, { new: true });
    }
}

module.exports = new PaymentRepository();