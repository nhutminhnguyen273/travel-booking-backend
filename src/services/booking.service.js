const Booking = require("../models/booking.model");
const BookingStatus = require("../enums/booking-status");
const PaymentService = require("./payment.service");

class BookingService {
    async create(userId, bookingData) {
        try {
            // Tạo booking với trạng thái pending
            const newBooking = new Booking({
                user: userId,
                tour: bookingData.tour,
                schedules: bookingData.schedules,
                peopleCount: bookingData.peopleCount,
                paymentMethod: bookingData.paymentMethod,
                status: BookingStatus.Pending,
                totalAmount: bookingData.totalAmount
            });

            // Tạo payment
            const payment = await PaymentService.createPayment({
                booking: newBooking._id,
                amount: bookingData.totalAmount,
                method: bookingData.paymentMethod,
                status: "pending"
            });

            // Lưu payment ID vào booking
            newBooking.payment = payment._id;
            await newBooking.save();

            return {
                booking: newBooking,
                payment: payment
            };
        } catch (error) {
            console.error(`❌ Lỗi khi tạo booking: ${error.message}`);
            throw error;
        }
    }

    async handlePaymentSuccess(paymentId) {
        try {
            // Cập nhật trạng thái payment
            const payment = await PaymentService.updatePaymentStatus(paymentId, "completed");
            
            // Cập nhật trạng thái booking
            const booking = await Booking.findOne({ payment: paymentId });
            if (!booking) {
                throw new Error("Không tìm thấy booking tương ứng");
            }

            booking.status = BookingStatus.Confirmed;
            await booking.save();

            return booking;
        } catch (error) {
            console.error(`❌ Lỗi khi xử lý thanh toán thành công: ${error.message}`);
            throw error;
        }
    }

    async handlePaymentFailed(paymentId) {
        try {
            // Cập nhật trạng thái payment
            const payment = await PaymentService.updatePaymentStatus(paymentId, "failed");
            
            // Cập nhật trạng thái booking
            const booking = await Booking.findOne({ payment: paymentId });
            if (!booking) {
                throw new Error("Không tìm thấy booking tương ứng");
            }

            booking.status = BookingStatus.Cancelled;
            await booking.save();

            return booking;
        } catch (error) {
            console.error(`❌ Lỗi khi xử lý thanh toán thất bại: ${error.message}`);
            throw error;
        }
    }

    async update(id, input) {
        try {
            const booking = await Booking.findById(id);
            if (!booking) throw new Error("Không tìm thấy thông tin đặt tour");
            return await Booking.findByIdAndUpdate(id, input, { new: true });
        } catch (error) {
            console.error(`❌ Lỗi khi cập nhật thông tin đặt tour: ${error.message}`);
            throw error;
        }
    }

    async cancel(id) {
        try {
            const booking = await Booking.findById(id);
            if (!booking) throw new Error("Không tìm thấy thông tin đặt tour");
            
            // Nếu booking đã thanh toán, cần hoàn tiền
            if (booking.status === BookingStatus.Confirmed) {
                await PaymentService.refundPayment(booking.payment);
            }
            
            return await Booking.findByIdAndUpdate(
                id, 
                { status: BookingStatus.Cancelled }, 
                { new: true }
            );
        } catch (error) {
            console.error(`❌ Lỗi khi hủy đặt tour: ${error.message}`);
            throw error;
        }
    }

    async getList(query = {}) {
        try {
            const { page = 1, limit = 10, status, sort = "-createdAt" } = query;
            const filter = {};
            
            if (status) {
                filter.status = status;
            }

            const bookings = await Booking.find(filter)
                .populate("user", "name email")
                .populate("tour", "name price")
                .populate("payment", "amount method status")
                .sort(sort)
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await Booking.countDocuments(filter);

            return {
                bookings,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            console.error(`❌ Lỗi khi lấy danh sách đặt tour: ${error.message}`);
            throw error;
        }
    }

    async getListByUser(userId, query = {}) {
        try {
            const { page = 1, limit = 10, status, sort = "-createdAt" } = query;
            const filter = { user: userId };
            
            if (status) {
                filter.status = status;
            }

            const bookings = await Booking.find(filter)
                .populate("tour", "name price")
                .populate("payment", "amount method status")
                .sort(sort)
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await Booking.countDocuments(filter);

            return {
                bookings,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            console.error(`❌ Lỗi khi lấy danh sách đặt tour: ${error.message}`);
            throw error;
        }
    }

    async getById(id) {
        try {
            const booking = await Booking.findById(id)
                .populate("user", "name email")
                .populate("tour", "name price")
                .populate("payment", "amount method status");
                
            if (!booking) {
                throw new Error("Không tìm thấy thông tin đặt tour");
            }
            
            return booking;
        } catch (error) {
            console.error(`❌ Lỗi khi lấy thông tin đặt tour: ${error.message}`);
            throw error;
        }
    }
}

module.exports = new BookingService();