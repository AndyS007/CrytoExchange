const express = require('express');
const router = express.Router();
require('dotenv').config();
const braintree = require('braintree');
const {updateBalance} = require("../controllers/walletController");
const {
  sendBTCTransaction,
} = require('../controllers/currencies/btc');
const {
  sendETHTransaction,
} = require('../controllers/currencies/eth');
const {
  sendMaticTransaction
} = require('../controllers/currencies/matic');
const {
  sendArbTransaction
} = require('../controllers/currencies/arb');

const fromAddress = {
  BTC: 'mu7sF7Bbbs9tE15VVUqHZ4cwUreRJzas2W',
  ETH: '0x7C101F205ccbd897f08D46623Cd4Bf1bA4e35F7b',
  MATIC: '0x6691af532879DE23E3EcCB9DA9FB30eC8D036517',
  ARB: '0x6021FFb47C47d344B63F095B8dA0b562Ea2F4274'
}

router.post('/', (req, res, next) => {
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    // Use your own credentials from the sandbox Control Panel here
    merchantId: process.env.MERCHANT_ID,
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY
  });

  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce;
  const {currency, toAddress, amount, coinPrice } = req.body;
  const value = amount * coinPrice;

  // Create a new transaction for $10
  const newTransaction = gateway.transaction.sale({
    amount: value,
    paymentMethodNonce: nonceFromTheClient,
    options: {
      // This option requests the funds from the transaction
      // once it has been authorized successfully
      submitForSettlement: true
    }
  }, async (error, result) => {
    if (result) {

      let tx;
      switch (currency) {
        case 'BTC':
          tx = await sendBTCTransaction(fromAddress[currency], toAddress, amount);
          break;
        case 'ETH':
          tx = await sendETHTransaction(fromAddress[currency], toAddress, amount);
          break;
        case 'MATIC':
          tx = await sendMaticTransaction(fromAddress[currency], toAddress, amount);
          break;
        case 'ARB':
          tx = await sendArbTransaction(fromAddress[currency], toAddress, amount);
          break;
      }

      if (!tx || tx instanceof Error) {
        res.status(500).json(tx);
        return;
      }
      await updateBalance(fromAddress[currency], currency);
      await updateBalance(toAddress, currency);

      res.send(result);
    } else {
      res.status(500).send(error);
    }
  });
});

module.exports = router;