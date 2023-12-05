const express = require('express');
const router = express.Router();
const { 
    getTransfersOfUser,
    createTransfer
 } = require('../controllers/transferController');

const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getTransfersOfUser);

router.post('/', protect, createTransfer);

module.exports = router