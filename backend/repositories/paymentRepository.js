const Payment = require('../models/payment');
class PaymentRepository {
    async createPayment(data) {
        return await Payment.create(data);
    }

    async findPaymentByTransactionId(transactionId) {
        return await Payment.findOne({ transactionId });
    }

    async updatePaymentStatus(transactionId, status, paidAt = null) {
        return await Payment.findOneAndUpdate(
            { transactionId },
            { paymentStatus: status, paidAt },
            { new: true }
        );
    }
}

module.exports = new PaymentRepository();