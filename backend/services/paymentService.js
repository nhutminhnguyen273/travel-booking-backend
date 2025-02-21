const PaymentRepository = require('../repositories/paymentRepository');
const BookingRepository = require('../repositories/bookingRepository');
const PaymentStatusEnum = require('../enums/paymentStatusEnum');

class PaymentService {
    async processPayment(bookingId, paymentMethod, transactionId, amount) {
        try {
            const booking = await BookingRepository.getBookingById(bookingId);
            if (!booking) {
                throw new Error("Không tìm thấy tour đặt");
            }

            const paymentData = {
                bookingId,
                paymentMethod,
                transactionId,
                amount,
                paymentDate: new Date(),
                status: PaymentStatusEnum.FAILED
            };

            return await PaymentRepository.createPayment(paymentData);
        } catch (error) {
            throw new Error(`Lỗi trong quá trình thanh toán: ${error.message}`);
        }
    }

    async confirmPayment(transactionId) {
        try {
            const payment = await PaymentRepository.getPaymentByTransactionId(transactionId);
            if (!payment) {
                throw new Error("Không tìm thấy thanh toán.");
            }

            return await PaymentRepository.updatePaymentStatus(payment._id, { status: PaymentStatusEnum.SUCCESS });
        } catch (error) {
            throw new Error(`Lỗi khi xác nhận thanh toán: ${error.message}`);
        }
    }

    async getPaymentByBookingId(bookingId) {
        return await PaymentRepository.getPaymentByBookingId(bookingId);
    }
}

module.exports = new PaymentService();