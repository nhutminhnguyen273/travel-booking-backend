const Payment = require('../models/payment');

class PaymentRepository {
    async createPayment(payment) {
        try {
            return await Payment.create(payment);
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            return await Payment.findById(id).populate("user booking");
        } catch (error) {
            throw error;
        }
    }

    async findByTransactionId(transactionId) {
        try {
            return await Payment.findOne({transactionId}).populate("user booking");
        } catch (error) {
            throw error;
        }
    }

    async updatePayment(id, payment) {
        try {
            return await Payment.findByIdAndUpdate(id, payment, {new:true});
        } catch (error) {
            throw error;
        }
    }

    async findAll(filter = {}) {
        try {
            return await Payment.find(filter).populate("user booking");
        } catch (error) {
            throw error;
        }
    }
}
module.exports = new PaymentRepository();