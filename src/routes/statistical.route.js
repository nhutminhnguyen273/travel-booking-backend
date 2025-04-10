const express = require("express");
const router = express.Router();
const StatisticalController = require("../controllers/statistical.controller");
const Middleware = require("../middleware/middleware");

// Lấy thống kê theo ngày
router.get("/daily", Middleware.verifyTokenAdmin, StatisticalController.getDailyStatistics);

// Lấy thống kê theo khoảng thời gian
router.get("/range", Middleware.verifyTokenAdmin, StatisticalController.getStatisticsByDateRange);

module.exports = router; 