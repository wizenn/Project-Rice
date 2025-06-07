const express = require('express');
const router = express.Router();

const riceController = require('../controllers/riceControllers');
const authAdmin = require('../middlewares/authAdmin');

// Tạo sản phẩm gạo (chỉ admin)
router.post('/createRice', authAdmin, riceController.createRiceProduct);
router.put('/updateRice/:id', authAdmin, riceController.updateRiceProduct);
router.delete('/deleteRice/:id', authAdmin, riceController.deleteRiceProduct);
router.get('/getAllRice', riceController.getAllRiceProducts);
router.get('/getRiceById/:id', riceController.getRiceById);

module.exports = router;