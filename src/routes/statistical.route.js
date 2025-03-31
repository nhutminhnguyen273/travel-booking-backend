const router = require("express").Router();
const Middleware = require("../middleware/middleware");
const StatisticalController = require("../controllers/statistical.controller");

router.post("/generate", Middleware.verifyTokenAdmin, StatisticalController.generateDailyStatistics);
router.get("/", Middleware.verifyTokenAdmin, StatisticalController.getAllStatistics);
router.get("/:id", Middleware.verifyTokenAdmin, StatisticalController.getStatisticsById);
router.delete("/:id", Middleware.verifyTokenAdmin, StatisticalController.deleteStatistics);

module.exports = router;