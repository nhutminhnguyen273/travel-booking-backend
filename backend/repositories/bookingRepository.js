const BookingModel = require('../models/bookingModel');

class BookingRepository {
    async createBooking(bookingData) {
        try {
            const booking = new BookingModel(bookingData);
            return await booking.save();
        } catch (err) {
            throw new Error(`Error creating booking: ${err.message}`);
        }
    }

    async getBookingById(bookingId) {
        return await BookingModel.findById(bookingId).populate('userId tourId');
    }

    async getAllBookings() {
        return await BookingModel.find().populate('userId tourId');
    }

    async updateBooking(bookingId, updateData) {
        return await BookingModel.findByIdAndUpdate(bookingId, updateData, { new: true });
    }

    async deleteBooking(bookingId) {
        return await BookingModel.findByIdAndDelete(bookingId);
    }

    async getBookingsByUserId(userId) {
        return await Booking.find({ userId }).populate('tourId');
    }
}
module.exports = new BookingRepository();