const express = require('express');
const Middleware = require('../middleware/middleware');
const TourController = require('../controllers/tourController');

const router = express.Router();

router.get('/', TourController.getListTours);
router.get('/domestic', TourController.getListDomesticTours);
router.get('/international', TourController.getListInternationalTours);
router.get('/:id', TourController.findTourById);
router.post('/', TourController.createTour);
router.put('/:id', TourController.updateTour);
router.put("/delete/:id", TourController.deleteUser);
router.put("/restore/:id", TourController.restoreUser);

module.exports = router;