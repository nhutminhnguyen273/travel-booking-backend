const mongoose = require("mongoose");
const BookingService = require("../services/booking.service");

class BookingController {
    async getListBooking(req, res) {
        try {
            const booking = await BookingService.getList();
            res.status(200).json({
                message: "Lấy danh sách đặt tour thành công",
                data: booking
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async getListBookingByUser(req, res) {
        try {
            const userId = req.user.id;
            const booking = await BookingService.getListByUser(userId);
            res.status(200).json({
                message: "Lấy danh sách đặt tour của bạn thành công",
                data: booking
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async createBooking(req, res) {
        try {
            const userId = req.user.id;
            const booking = await BookingService.create(userId, req.body);
            res.status(200).json({
                message: "Đặt tour thành công",
                data: booking
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async updateBooking(req, res) {
        try {
            const booking = await BookingService.update(req.params.id, req.body);
            res.status(200).json({
                message: "Cập nhật thông tin đặt tour thành công",
                data: booking
            });
        } catch (error) {
            res.status(404).json({
                message: "Lỗi",
                error: error.message,
            });
        }
    }

    async confirmBooking(req, res) {
        try {
            const booking = await BookingService.confirm(req.params.id);
            res.status(200).json({
                message: "Xác nhận đặt tour thành công!",
                data: booking
            });
        } catch (error) {
            res.status(404).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async cancelBooking(req, res) {
        try {
            const booking = await BookingService.cancel(req.params.id);
            res.status(200).json({
                message: "Hủy đặt tour thành công!",
                data: booking
            });
        } catch (error) {
            res.status(404).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }
}

module.exports = new BookingController();