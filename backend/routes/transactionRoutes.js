const express = require('express');
const router = express.Router();
const { 
    getAllTransactions,
    getTransactionsOfUser,
    getTransactionsOfWallet,
    getTransaction,
    createTransaction
 } = require('../controllers/transactionController');

const { protect } = require('../middlewares/authMiddleware');

router.get('/', getAllTransactions);

router.post('/', protect, createTransaction);

router.get('/user/:user_id', protect, getTransactionsOfUser);

router.get('/wallet/:walletAddress', getTransactionsOfWallet);

router.get('/:tx_id', getTransaction);

module.exports = router