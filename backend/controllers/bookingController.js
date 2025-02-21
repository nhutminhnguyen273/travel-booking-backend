const BookingService = require('../services/bookingService');

class BookingController {
    async bookTour(req, res) {
        try {
            const userId = req.user.id;
            const { tourId, numberOfGuests, totalPrice } = req.body;
            const booking = await BookingService.bookTour(userId, tourId, numberOfGuests, totalPrice);
            res.status(201).json({ message: "Thành công", data: booking });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi đặt tour", error: error.message });
        }
    }

    async confirmBooking(req, res) {
        try {
            const { bookingId } = req.params;
            const booking = await BookingService.confirmBooking(bookingId);
            res.status(200).json({ message: "Xác nhận đặt tour thành công", data: booking });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi xác nhận đặt tour", error: error.message });
        }
    }

    async cancelBooking(req, res) {
        try {
            const { bookingId } = req.params;
            const booking = await BookingService.cancelBooking(bookingId);
            res.status(200).json({ message: "Hủy tour thành công", data: booking });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi hủy tour", error: error.message });
        }
    }

    async updatePaymentStatus(req, res) {
        try {
            const { bookingId } = req.params;
            const { status } = req.body;
            const booking = await BookingService.updatePaymentStatus(bookingId, status);
            res.status(200).json({ message: "Cập nhật trạng thái thanh toán thành công", data: booking });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi cập nhật trạng thái thanh toán", error: error.message });
        }
    }

    async getUserBookings(req, res) {
        try {
            const userId = req.user.id;
            const bookings = await BookingService.getUserBookings(userId);
            res.status(200).json({ message: "Lấy danh sách tour thành công", data: bookings });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy danh sách tour", error: error.message });
        }
    }

    async getBookingDetails(req, res) {
        try {
            const { bookingId } = req.params;
            const booking = await BookingService.getBookingDetails(bookingId);
            res.status(200).json({ message: "Lấy thông tin chi tiết đặt thành công", data: booking });
        } catch (error) {
            res.status(500).json({ message: "Lỗi khi lấy thông tin chi tiết đặt tour", error: error.message });
        }
    }
}

module.exports = new BookingController();