const BookingRepository = require('../repositories/bookingRepository');
const BookingStatusEnum = require('../enums/bookingStatusEnum');
const PaymentStatusEnum = require('../enums/paymentStatusEnum');

class BookingService {
    async bookTour(userId, tourId, numberOfGuests, totalPrice) {
        try {
            const bookingData = {
                userId,
                tourId,
                numberOfGuests,
                totalPrice
            };
            return await BookingRepository.createBooking(bookingData);
        } catch (err) {
            throw new Error(`Lỗi khi đặt tour: ${err.message}`);
        }
    }

    async confirmBooking(bookingId) {
        try {
            return await BookingRepository.updateBooking(bookingId, { status: BookingStatusEnum.SUCCESS });
        } catch (err) {
            throw new Error(`Lỗi khi xác nhận đặt tour: ${err.message}`);
        }
    }

    async cancelBooking(bookingId) {
        try {
            return await BookingRepository.updateBooking(bookingId, { status: BookingStatusEnum.FAILED });
        } catch (err) {
            throw new Error(`Lỗi khi hủy đặt tour: ${err.message}`);
        }
    }

    async updatePaymentStatus(bookingId, status) {
        try {
            return await BookingRepository.updateBooking(bookingId, {paymentStatus: status});
        } catch(err) {
            return new Error(`Lỗi khi cập nhật trạng thái thanh toán: ${err.message}`);
        }
    }
    
    async getUserBookings(userId) {
        return await BookingRepository.getBookingsByUserId(userId);
    }

    async getBookingDetails(bookingId) {
        return await BookingRepository.getBookingById(bookingId);
    }
}
module.exports = new BookingService();