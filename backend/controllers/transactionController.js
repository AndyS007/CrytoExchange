const asyncHandler = require('express-async-handler');
const Transaction = require('../models/transactionModel');
const { 
  sendBTCTransaction, 
  getBTCTransactionsOfWallet,
  getBTCTransactionsOfId
} = require('./currencies/btc');
const { 
  sendETHTransaction,
  getETHTransactionsOfAccount,
  getETHTransactionsOfId
 } = require('./currencies/eth');
const {
  sendMaticTransaction
} = require('./currencies/matic')
const {
  sendArbTransaction
} = require('./currencies/arb')

// @desc Get all transactions from database
// @route GET /api/transactions
// @access Public
const getAllTransactions = asyncHandler( async (req, res) => {
    const transactions = await Transaction.find().select('tx');
    res.status(200).json(transactions);
})

// @desc Get all transactions of user from database
// @route GET /api/transactions/user/:user_id
// @access Public
const getTransactionsOfUser = asyncHandler( async (req, res) => {
    console.log(req.params);
    const transactions = await Transaction.find({ user: req.params.user_id });
    res.status(200).json(transactions);
})

// @desc Get all transactions of wallet from testnet
// @route GET /api/transactions/wallet/:address
// @access Public
const getTransactionsOfWallet = asyncHandler( async (req, res) => {
    // TODO get transactions with wallet address from testnet of dirrenent currency
    const walletAddress = req.params.walletAddress;
    const txs = await getBTCTransactionsOfWallet(walletAddress);
    console.log(txs);
    res.status(200).json(txs);
})

// @desc Get a transaction with id
// @route GET /api/transactions/:tx_id
// @access Public
const getTransaction = asyncHandler( async (req, res) => {
    const { tx_id } = req.params;
    if (!tx_id) {
        res.status(400);
        throw new Error('Require transaction id');
    }

    let tx = await Transaction.findOne({ tx_id: tx_id }).select('tx');

    // if transaction not in the database, search on the testnet
    if (!tx) {
        // TODO get transactions with tx_id from testnet of dirrenent currency
        tx = await getBTCTransactionsOfId(tx_id);
    }

    // If not found in testnet either, return 404
    if (!tx) {
        res.status(404);
        throw new Error('Transaction Not Found');
    }

    res.status(200).json(tx);
})

// @desc Create a transaction
// @route POST /api/transactions
// @access Private
const createTransaction = asyncHandler( async (req, res) => {
  const { pair, fromAddress, toAddress, amount } = req.body;
  if (!pair || !fromAddress || !toAddress || !amount) {
    res.status(400);
    throw new Error('Please fill all the fields');
  }

  let tx;
  switch (pair) {
    case 'BTC2BTC':
      tx = await sendBTCTransaction(fromAddress, toAddress, amount);
      break;
    case 'ETH2ETH':
      tx = await sendETHTransaction(fromAddress, toAddress, amount);
      break;
    case 'MATIC2MATIC':
      tx = await sendMaticTransaction(fromAddress, toAddress, amount);
      break;
    case 'ARB2ARB':
      tx = await sendArbTransaction(fromAddress, toAddress, amount);
      break;
  }

  if (!tx) {
    res.status(500);
    throw new Error('Create transaction failed');
  }

  // Record the transaction into the database
  const transaction = await Transaction.create({
    user: req.user.id,
    pair: pair,
    ...tx
  });

  res.status(200).json(transaction);
})

module.exports = {
  getAllTransactions,
  getTransactionsOfUser,
  getTransactionsOfWallet,
  getTransaction,
  createTransaction
};