const express = require("express");
const router = express.Router();
const StatisticalController = require("../controllers/statisticalController");
const Middleware = require('../middleware/middleware');

// Tất cả routes chỉ dành cho Admin
router.use(Middleware.verifyTokenAdmin);

router.post("/generate", StatisticalController.generateDailyStatistics);
router.get("/", StatisticalController.getAllStatistics);
router.get("/:id", StatisticalController.getStatisticsById);
router.delete("/:id", StatisticalController.deleteStatistics);

module.exports = router;