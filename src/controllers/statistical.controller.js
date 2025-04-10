const StatisticalService = require("../services/statistical.service");

class StatisticalController {
    async getDailyStatistics(req, res) {
        try {
            const statistics = await StatisticalService.getDailyStatistics();
            res.status(200).json({
                message: "Lấy thống kê thành công",
                data: statistics
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }

    async getStatisticsByDateRange(req, res) {
        try {
            const { startDate, endDate } = req.query;
            
            if (!startDate || !endDate) {
                return res.status(400).json({
                    message: "Lỗi",
                    error: "Thiếu thông tin ngày bắt đầu hoặc ngày kết thúc"
                });
            }

            const statistics = await StatisticalService.getStatisticsByDateRange(startDate, endDate);
            res.status(200).json({
                message: "Lấy thống kê theo khoảng thời gian thành công",
                data: statistics
            });
        } catch (error) {
            res.status(500).json({
                message: "Lỗi",
                error: error.message
            });
        }
    }
}

module.exports = new StatisticalController();
