const express = require('express');
const router = express.Router();
const { verify } = require("../controllers/verificationController");
const { protect } = require('../middlewares/authMiddleware');

router.post('/verify', protect, verify);

module.exports = router