const asyncHandler = require('express-async-handler');
const Transfer = require("../models/transferModel");
const User = require("../models/userModel");
const Wallet = require("../models/walletModel");
const { 
  sendBTCTransaction, 
} = require('./currencies/btc');
const { 
  sendETHTransaction,
 } = require('./currencies/eth');
const {
  sendMaticTransaction
} = require('./currencies/matic');
const {
  sendArbTransaction
} = require('./currencies/arb');
const { updateBalance } = require('./walletController');

// @desc Get all transfers of user from database
// @route GET /api/transfers/user/:user_id
// @access Private
const getTransfersOfUser = asyncHandler( async (req, res) => {
    const transfers = await Transfer.find({ user: req.user.id });
    res.status(200).json(transfers);
})

// @desc Create a transfer
// @route POST /api/transfers
// @access Private
const createTransfer = asyncHandler( async (req, res) => {
  const { currency, fromAddress, toUser, amount } = req.body;
  if (!currency || !fromAddress || !toUser || !amount) {
    res.status(400);
    throw new Error('Please fill all the fields');
  }

  const toUserId = await User.findOne({email: toUser}).select('_id');
  if (!toUserId) {
    res.status(400);
    throw new Error('Do not find user to transfer to');
  }

  console.log(toUserId);

  const toWallet = await Wallet.findOne({
    user: toUserId,
    currency: currency
  }).select('address');

  if (!toWallet || !toWallet.address) {
    res.status(400);
    throw new Error(`User ${toUser} haven't create wallet`);
  }

  console.log("to address: ", toWallet.address);
  const toAddress = toWallet.address;

  let tx;
  switch (currency) {
    case 'BTC':
      tx = await sendBTCTransaction(fromAddress, toAddress, amount);
      break;
    case 'ETH':
      tx = await sendETHTransaction(fromAddress, toAddress, amount);
      break;
    case 'MATIC':
      tx = await sendMaticTransaction(fromAddress, toAddress, amount);
      break;
    case 'ARB':
      tx = await sendArbTransaction(fromAddress, toAddress, amount);
      break;
  }

  if (!tx || tx instanceof Error) {
    res.status(500);
    throw new Error(`${tx ? tx.message : 'Transfer failed!'}`);
  }

  // Record the transaction into the database
  const transfer = await Transfer.create({
    user: req.user.id,
    currency,
    fromAddress,
    toUser,
    amount,
    ...tx
  });

  await updateBalance(fromAddress, currency);
  await updateBalance(toAddress, currency);

  res.status(200).json(transfer);
})

module.exports = {
    getTransfersOfUser,
    createTransfer
};