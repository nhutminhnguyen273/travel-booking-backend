const Statistical = require("../models/statistical.model");
const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const Tour = require("../models/tour.model");
const Payment = require("../models/payment.model");

class StatisticalService {
    async generateDailyStatistics() {
        try {
            const date = new Date().toISOString().split("T")[0];

            // Tính tổng số booking
            const totalBookings = await Booking.countDocuments();
            // Tính tổng doanh thu từ các payment thành công
            const totalRevenue = await Payment.aggregate([
                { $match: { paymentStatus: "Paid" } },
                { $group: { _id: null, total: { $sum: "$amount" } } }
            ]);
            const revenue = totalRevenue.length > 0 ? totalRevenue[0].total : 0;

            // Tính tổng số người dùng và tour
            const totalUsers = await User.countDocuments();
            const totalTours = await Tour.countDocuments();

            // Tính tổng số booking theo trạng thái
            const bookingStatus = await Booking.aggregate([
                { $group: { _id: "$status", count: { $sum: 1 } } }
            ]);

            let statusSummary = { pending: 0, confirmed: 0, cancelled: 0 };
            bookingStatus.forEach(item => {
                statusSummary[item._id.toLowerCase()] = item.count;
            });

            // Tính tổng doanh thu theo từng tour
            const revenueByTour = await Payment.aggregate([
                { $match: { paymentStatus: "Paid" } },
                {
                    $lookup: {
                        from: "bookings",
                        localField: "booking",
                        foreignField: "_id",
                        as: "bookingInfo"
                    }
                },
                { $unwind: "$bookingInfo" },
                {
                    $group: {
                        _id: "$bookingInfo.tour",
                        revenue: { $sum: "$amount" }
                    }
                }
            ]);

            // Kiểm tra xem đã có dữ liệu thống kê hôm nay chưa
            let existingStat = await StatisticalRepository.findByDate(date);
            if (existingStat) {
                return await StatisticalRepository.updateById(existingStat._id, {
                    totalBookings,
                    totalRevenue: revenue,
                    totalUsers,
                    totalTours,
                    bookingStatus: statusSummary,
                    revenueByTour
                });
            } else {
                return await StatisticalRepository.create({
                    date,
                    totalBookings,
                    totalRevenue: revenue,
                    totalUsers,
                    totalTours,
                    bookingStatus: statusSummary,
                    revenueByTour
                });
            }
        } catch (error) {
            console.error(`❌ Lỗi khi thống kê doanh thu: ${error.message}`);
            throw error;
        }
    }

    async getAllStatistics() {
        try {
            return await StatisticalRepository.getAll();
        } catch (error) {
            console.error(`❌ Lỗi khi lấy danh sách thống kê: ${error.message}`);
            throw error;
        }
    }

    async getStatisticsByIs(id) {
        try {
            return await StatisticalRepository.findById(id);
        } catch (error) {
            console.error(`❌ Lỗi khi lấy thông tin thông kê: ${error.message}`);
            throw error;
        }
    }
}
module.exports = new StatisticalService();