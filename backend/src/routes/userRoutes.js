const express = require('express');
const router = express.Router();

const userController = require('../controllers/userControllers');
const authUsers = require('../middlewares/authUsers');
const authAdmin = require('../middlewares/authAdmin');

// GET /api/users - lấy danh sách user
router.get('/allUsers', authAdmin, userController.getAllUsers);
router.post('/registerUsers', userController.registerUser);
router.post('/loginUsers', userController.loginUser);
router.get('/adminUser', authAdmin, userController.testUser);

router.put('/updateUsers/:UserId', authUsers, userController.updateUser);
router.delete('/deleteUsers/:UserId', authUsers, userController.deleteUser);
module.exports = router;
