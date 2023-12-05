const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getMe
} = require("../controllers/userController");

const { protect } = require('../middlewares/authMiddleware');

router.post('/register', registerUser);

router.get('/me', protect, getMe);

router.post('/login', loginUser);

module.exports = router