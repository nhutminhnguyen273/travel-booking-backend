const router = require("express").Router();
const Middleware = require("../middleware/middleware");
const ReviewController = require("../controllers/review.controller");

router.get("/", ReviewController.getListReviews);
router.post("/", Middleware.verifyToken, ReviewController.createReview);
router.put("/", Middleware.verifyToken, ReviewController.updateReview);
router.delete("/", Middleware.verifyToken, ReviewController.deleteReview);

module.exports = router;