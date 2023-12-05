const express = require('express');
const router = express.Router();
const {
    getAllWallets,
    createWallet,
    connectWallet,
    getWallet,
    getBalance
} = require('../controllers/walletController');

const { protect } = require('../middlewares/authMiddleware');

router.get('/', protect, getAllWallets);

router.post('/', protect, createWallet);

router.post('/connect', protect, connectWallet);

router.get('/:address', protect, getWallet);

router.get('/balance/:address', protect, getBalance);

module.exports = router