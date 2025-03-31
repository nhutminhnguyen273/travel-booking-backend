const router = require("express").Router();
const Middleware = require("../middleware/middleware");
const BookingController = require("../controllers/booking.controller");

router.get("/", Middleware.verifyTokenAdmin, BookingController.getListBooking);
router.get("/users", Middleware.verifyToken, BookingController.getListBookingByUser);
router.post("/", Middleware.verifyToken, BookingController.createBooking);
router.put("/:id", Middleware.verifyTokenAdminAndUser, BookingController.updateBooking);
router.put("/confirm/:id", Middleware.verifyTokenAdmin, BookingController.confirmBooking);
router.put("/cancel/:id", Middleware.verifyTokenAdmin, BookingController.cancelBooking);

module.exports = router;