const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authUser = require('../middlewares/authUsers');
const authAdmin = require('../middlewares/authAdmin');


// Tạo đơn hàng
router.post('/createOrder', authUser, orderController.createOrder);
router.get('/getOneOrder/:id', authAdmin, orderController.getOrderById);
router.delete('/deleteOrder/:id', authAdmin, orderController.deleteOrder);
router.put('/updateStatus/:id', authAdmin, orderController.updateOrderStatus);
router.put('/updateOrder/:id', authAdmin, orderController.updateOrder);
router.get('/allOrders', authAdmin, orderController.getAllOrders);
router.get('/history', authUser, orderController.getOrderHistoryByUser);

module.exports = router;