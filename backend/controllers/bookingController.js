const BookingService = require('../services/bookingService');

class BookingController {
    async bookTour(req, res) {
        try {
            const userId = req.user.id;
            const { tourId, numberOfGuests, totalPrice } = req.body;
            const booking = await BookingService.bookTour(userId, tourId, numberOfGuests, totalPrice);
            res.status(201).json({ success: true, data: booking });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async confirmBooking(req, res) {
        try {
            const { bookingId } = req.params;
            const booking = await BookingService.confirmBooking(bookingId);
            res.status(200).json({ success: true, data: booking });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async cancelBooking(req, res) {
        try {
            const { bookingId } = req.params;
            const booking = await BookingService.cancelBooking(bookingId);
            res.status(200).json({ success: true, data: booking });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async updatePaymentStatus(req, res) {
        try {
            const { bookingId } = req.params;
            const { status } = req.body;
            const booking = await BookingService.updatePaymentStatus(bookingId, status);
            res.status(200).json({ success: true, data: booking });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getUserBookings(req, res) {
        try {
            const userId = req.user.id;
            const bookings = await BookingService.getUserBookings(userId);
            res.status(200).json({ success: true, data: bookings });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async getBookingDetails(req, res) {
        try {
            const { bookingId } = req.params;
            const booking = await BookingService.getBookingDetails(bookingId);
            res.status(200).json({ success: true, data: booking });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new BookingController();