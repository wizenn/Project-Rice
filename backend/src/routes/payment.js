const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/create', paymentController.createMomoPayment);
// router.post('/ipn', paymentController.momoIpnHandler);

module.exports = router;