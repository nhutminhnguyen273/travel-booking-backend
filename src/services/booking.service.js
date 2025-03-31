const Booking = require("../models/booking.model");
const BookingStatus = require("../enums/booking-status");

class BookingService {
    async create(userId, booking) {
        try {
            const newBooking = new Booking({
                user: userId,
                tour: booking.tour,
                schedules: booking.schedules,
                peopleCount: booking.peopleCount,
                paymentMethod: booking.paymentMethod
            });
            return await newBooking.save();
        } catch (error) {
            console.error(`❌ Lỗi khi đặt tour: ${error.message}`);
            throw error
        }
    }

    async update(id, input) {
        try {
            const booking = await Booking.findById(id);
            if (!booking) throw new Error("Không tìm thấy thông tin đặt tour");
            return await Booking.findByIdAndUpdate(id, input);
        } catch (error) {
            console.error(`❌ Lỗi khi cập nhật thông tin đặt tour`);
        }
    }

    async confirm(id) {
        try {
            const booking = await Booking.findById(id);
            if (!booking) throw new Error("Không tìm thấy thông tin đặt tour");
            return await Booking.findByIdAndUpdate(id, { status: BookingStatus.Confirmed }, { new: true });
        } catch (error) {
            console.error(`❌ Lỗi khi xác nhận đặt tour: ${error.message}`);
            throw error;
        }
    }

    async cancel(id) {
        try {
            const booking = await Booking.findById(id);
            if (!booking) throw new Error("Không tìm thấy thông tin đặt tour");
            return await Booking.findByIdAndUpdate(id, { status: BookingStatus.Cancelled }, { new: true });
        } catch (error) {
            console.error(`❌ Lỗi khi hủy đặt tour: ${error.message}`);
            throw error;
        }
    }

    async getList() {
        try {
            return await Booking.find();
        } catch (error) {
            console.error(`❌ Lỗi khi lấy danh sách đặt tour: ${error.message}`);
            throw error;
        }
    }

    async getListByUser(userId) {
        try {
            return await Booking.find({ user: userId });
        } catch (error) {
            console.error(`❌ Lỗi khi lấy danh sách đặt tour: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new BookingService();