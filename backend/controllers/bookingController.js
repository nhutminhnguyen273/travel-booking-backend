const { default: mongoose } = require('mongoose');
const BookingService = require('../services/bookingService');

class BookingController {
    async getListBooking(req, res) {
        try {
            const listBooking = await BookingService.getListBooking();
            res.status(200).json({
                message: "List booking",
                data: listBooking
            });
        } catch (err) {
            res.json(200).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async getListBookingUsers(req, res) {
        try {
            const userId = req.user.id;
            if (!userId) throw new Error("User not found");
            const listBooking = await BookingService.getListBookingUsers(userId);
            res.status(200).json({
                message: "List booking",
                data: listBooking
            });
        } catch (err) {
            res.json(200).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async createBooking(req, res) {
        try {
            const userId = req.user?.id;
            if (!userId) throw new Error("User not found");
            const bookingData = {
                ...req.body,
                user: new mongoose.Types.ObjectId(userId) // Chuyển thành ObjectId
            };
            const newBooking = await BookingService.createBooking(bookingData);
            res.status(200).json({
                message: "Created booking",
                data: newBooking
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async confirmBooking(req, res) {
        try {
            const confirm = await BookingService.confirmBooking(req.params.id);
            res.status(200).json({
                message: "Confirmed booking",
                data: confirm
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }

    async cancelBooking(req, res) {
        try {
            const cancel = await BookingService.cancelBooking(req.params.id);
            res.status(200).json({
                message: "Canceled booking",
                data: cancel
            });
        } catch (err) {
            res.status(500).json({
                message: "Error",
                error: err.message
            });
        }
    }
}
module.exports = new BookingController();