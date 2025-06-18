const express = require('express');
const router = express.Router();

const riceController = require('../controllers/riceControllers');
const authAdmin = require('../middlewares/authAdmin');

// Tạo sản phẩm gạo (chỉ admin)
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/createRice', authAdmin, upload.array('images'), riceController.createRiceProduct);
router.put('/updateRice/:id', authAdmin, upload.array('images'), riceController.updateRiceProduct);
router.delete('/deleteRice/:id', authAdmin, riceController.deleteRiceProduct);
router.get('/getAllRice', riceController.getAllRiceProducts);
router.get('/getRiceById/:id', riceController.getRiceById);

module.exports = router;