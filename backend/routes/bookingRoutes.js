const express = require('express');
const router = express.Router();
const BookingController = require('../controllers/bookingController');
const Middleware = require('../config/middleware');

router.post('/book', Middleware.verifyToken, BookingController.bookTour);
router.put('/confirm/:bookingId', Middleware.verifyToken, BookingController.confirmBooking);
router.put('/cancel/:bookingId', Middleware.verifyToken, BookingController.cancelBooking);
router.put('/payment/:bookingId', Middleware.verifyToken, BookingController.updatePaymentStatus);
router.get('/user/:userId', Middleware.verifyToken, BookingController.getUserBookings);
router.get('/:bookingId', Middleware.verifyToken, BookingController.getBookingDetails);

module.exports = router;