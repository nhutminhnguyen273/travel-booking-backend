const express = require("express");
const router = express.Router();
const StatisticalController = require("../controllers/statisticalController");
const Middleware = require('../middleware/middleware');

router.post("/generate", Middleware.verifyTokenAdmin, StatisticalController.generateDailyStatistics);
router.get("/", Middleware.verifyTokenAdmin, StatisticalController.getAllStatistics);
router.get("/:id", Middleware.verifyTokenAdmin, StatisticalController.getStatisticsById);
router.delete("/:id", Middleware.verifyTokenAdmin, StatisticalController.deleteStatistics);

module.exports = router;