const StatisticalService = require('../services/statisticalService');

class StatisticalController {
    async generateDailyStatistics(req, res) {
        try {
            const statistics = await StatisticalService.generateDailyStatistics();
            return res.status(200).json({
                success: true,
                message: "Thống kê hàng ngày đã được cập nhật!",
                data: statistics
            });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    async getAllStatistics(req, res) {
        try {
            const statistics = await StatisticalService.getAllStatistics();
            return res.status(200).json({ success: true, data: statistics });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    async getStatisticsById(req, res) {
        try {
            const { id } = req.params;
            const statistics = await StatisticalService.getStatisticsById(id);
            if (!statistics) {
                return res.status(404).json({ success: false, message: "Không tìm thấy dữ liệu" });
            }
            return res.status(200).json({ success: true, data: statistics });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    async deleteStatistics(req, res) {
        try {
            const { id } = req.params;
            await StatisticalService.deleteStatistics(id);
            return res.status(200).json({ success: true, message: "Xóa thống kê thành công!" });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new StatisticalController();