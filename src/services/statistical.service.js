const Statistical = require("../models/statistical.model");
const Booking = require("../models/booking.model");
const Tour = require("../models/tour.model");
const User = require("../models/user.model");

class StatisticalService {
    async getDailyStatistics() {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Get total bookings
            const totalBookings = await Booking.countDocuments();

            // Get total revenue
            const bookings = await Booking.find({ status: "confirmed" });
            const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalPrice, 0);

            // Get total users
            const totalUsers = await User.countDocuments();

            // Get total tours
            const totalTours = await Tour.countDocuments();

            // Get payment methods statistics
            const vnpayBookings = await Booking.countDocuments({ paymentMethod: "VNPay" });
            const momoBookings = await Booking.countDocuments({ paymentMethod: "MoMo" });

            // Get booking status statistics
            const pendingBookings = await Booking.countDocuments({ status: "pending" });
            const confirmedBookings = await Booking.countDocuments({ status: "confirmed" });
            const cancelledBookings = await Booking.countDocuments({ status: "cancelled" });

            // Get revenue by tour
            const revenueByTour = await Booking.aggregate([
                { $match: { status: "confirmed" } },
                { $group: { _id: "$tour", revenue: { $sum: "$totalPrice" } } },
                { $lookup: { from: "tours", localField: "_id", foreignField: "_id", as: "tourInfo" } },
                { $unwind: "$tourInfo" },
                { $project: { tour: "$_id", revenue: 1, _id: 0 } }
            ]);

            // Get monthly revenue
            const monthlyRevenue = await Booking.aggregate([
                { $match: { status: "confirmed" } },
                {
                    $group: {
                        _id: {
                            month: { $month: "$createdAt" },
                            year: { $year: "$createdAt" }
                        },
                        revenue: { $sum: "$totalPrice" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        month: "$_id.month",
                        year: "$_id.year",
                        revenue: 1
                    }
                }
            ]);

            // Create or update daily statistics
            const statistics = await Statistical.findOneAndUpdate(
                { date: today },
                {
                    totalBookings,
                    totalRevenue,
                    totalUsers,
                    totalTours,
                    paymentMethods: {
                        VNPay: vnpayBookings,
                        MoMo: momoBookings
                    },
                    bookingStatus: {
                        pending: pendingBookings,
                        confirmed: confirmedBookings,
                        cancelled: cancelledBookings
                    },
                    revenueByTour,
                    monthlyRevenue
                },
                { upsert: true, new: true }
            );

            return statistics;
        } catch (error) {
            console.error("Error in getDailyStatistics:", error);
            throw error;
        }
    }

    async getStatisticsByDateRange(startDate, endDate) {
        try {
            const statistics = await Statistical.find({
                date: {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate)
                }
            }).sort({ date: 1 });

            return statistics;
        } catch (error) {
            console.error("Error in getStatisticsByDateRange:", error);
            throw error;
        }
    }
}

module.exports = new StatisticalService();
