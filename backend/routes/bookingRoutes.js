const express = require('express');
const BookingController = require('../controllers/bookingController');
const Middleware = require('../middleware/middleware');

const router = express.Router();

// Admin only route
router.get('/', Middleware.verifyTokenAdmin, BookingController.getListBooking);

// Authenticated user routes
router.post('/', Middleware.verifyToken, BookingController.createBooking);
router.put('/confirm', Middleware.verifyToken, BookingController.confirmBooking);
router.put('/cancel', Middleware.verifyToken, BookingController.cancelBooking);

// Thêm route mới
router.get('/:id', Middleware.verifyToken, BookingController.findBookingById);

module.exports = router;