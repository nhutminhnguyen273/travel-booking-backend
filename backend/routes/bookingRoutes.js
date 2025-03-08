const express = require('express');
const BookingController = require('../controllers/bookingController');
const Middleware = require('../middleware/middleware');

const router = express.Router();

router.get('/', BookingController.getListBooking);
router.post('/', Middleware.verifyToken, BookingController.createBooking);
router.put('/confirm', Middleware.verifyToken, BookingController.confirmBooking);
router.put('/cancel', Middleware.verifyToken, BookingController.cancelBooking);

module.exports = router;