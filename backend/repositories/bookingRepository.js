const Booking = require("../models/booking");

class BookingRepository {
    async getListBooking() {
        try {
            return await Booking.find()
                .populate("tour")
                .populate("user");
        } catch (error) {
            throw error;
        }
    }

    async getListBookingByUser(userId) {
        try {
            return await Booking.find({ user: userId })
                .populate("tour")
                .populate("user");
        } catch (error) {
            throw error;
        }
    }

    async findBookingById(id) {
        try {
            return await Booking.findById(id)
                .populate("tour")
                .populate("user");
        } catch (error) {
            throw error;
        }
    }

    async createBooking(booking) {
        try {
            return await Booking.create(booking);
        } catch (error) {
            throw error;
        }
    }

    async updateBooking(id, booking) {
        try {
            return await Booking.findByIdAndUpdate(id, booking, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async confirmBooking(id) {
        try {
            return await Booking.findByIdAndUpdate(id, { status: "Confirmed" }, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async cancelBooking(id) {
        try {
            return await Booking.findByIdAndUpdate(id, { status: "Cancelled" }, { new: true });
        } catch (error) {
            throw error;
        }
    }

    async getBookingsByStatus(status) {
        try {
            return await Booking.find({ status })
                .populate("tour")
                .populate("user");
        } catch (error) {
            throw error;
        }
    }
}
module.exports = new BookingRepository();