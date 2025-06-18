const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authAdmin = require('../middlewares/authAdmin');

router.get('/stats', authAdmin, dashboardController.getDashboardStats);

module.exports = router;