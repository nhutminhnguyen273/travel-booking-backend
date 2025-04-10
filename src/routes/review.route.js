const router = require("express").Router();
const Middleware = require("../middleware/middleware");
const ReviewController = require("../controllers/review.controller");

// Get reviews for a specific tour
router.get("/tour/:tourId", ReviewController.getListReviews);

// Create, update, and delete reviews
router.post("/", Middleware.verifyToken, ReviewController.createReview);
router.put("/", Middleware.verifyToken, ReviewController.updateReview);
router.delete("/", Middleware.verifyToken, ReviewController.deleteReview);

module.exports = router;