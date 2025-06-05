const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// GET all users
router.get('/', userController.getUsers);

// POST create user
router.post('/', userController.createUser);

module.exports = router;
