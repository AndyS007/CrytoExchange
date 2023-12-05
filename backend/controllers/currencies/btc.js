const bitcoin = require('bitcoinjs-lib');
const { ECPairFactory } = require('ecpair');
const tinysecp256k1 = require('tiny-secp256k1');
const ECPair = ECPairFactory(tinysecp256k1);
const axios = require('axios');
const { convertSatoshisToBTC, convertBTCToSatoshis } = require('../../utils/walletUtils');
const Wallet = require('../../models/walletModel');

// Create a BTC testnet wallet
const createBTCWallet = () => {
    const testnet = bitcoin.networks.testnet;
    const keyPair = ECPair.makeRandom({ network: testnet });
    const { address } = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: testnet });
    const wallet = {
      currency: 'BTC',
      address: address,
      privateKey: keyPair.privateKey.toString('hex'),
      balance: 0
    };
    return wallet;
}
  
// Get testnet BTC wallet balance by address
const getBTCWalletBalance = async (address) => {
      const { data } = await axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}/balance`);
      const balance = convertSatoshisToBTC(data.final_balance);
      return balance;
}

// Get all transaction of a BTC address
const getBTCTransactionsOfWallet = async (address) => {
    const endpoint = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}/full`;
    const response = await axios.get(endpoint);
    return response.data.txs;
}

// Get a transaction of tx hash
const getBTCTransactionsOfId = async (tx_id) => {
    const endpoint = `https://api.blockcypher.com/v1/btc/test3/txs/${tx_id}`;
    const response = await axios.get(endpoint);
    return response.data;
}

// Send a BTC2BTC test transaction through Blockcypher API
const sendBTCTransaction = async (fromAddress, toAddress, amount) => {
    // Set the new transaction API endpoint
    const endpoint = 'https://api.blockcypher.com/v1/btc/test3/txs/new';
  
    // Set the transaction data
    const transactionData = {
      inputs: [{
        addresses: [fromAddress]
      }],
      outputs: [{
        addresses: [toAddress],
        value: convertBTCToSatoshis(amount)
      }]
    };
  
    try {
      // Get the new transaction hex
      const response = await axios.post(endpoint, transactionData);
      const tmptx = response.data;
  
      // Get privateKey
      const { privateKey } = await Wallet.findOne({ address: fromAddress });
      // Generate keys from privateKey
      const keyBuffer = Buffer.from(privateKey, 'hex')
      const keys = ECPair.fromPrivateKey(keyBuffer);
  
      // Sign the transaction
      tmptx.pubkeys = [];
      tmptx.signatures = tmptx.tosign.map(function (tosign, n) {
          tmptx.pubkeys.push(keys.publicKey.toString('hex'));
          return bitcoin.script.signature.encode(
            keys.sign(Buffer.from(tosign, "hex")),
            0x01,
          ).toString("hex").slice(0, -2);
        });
  
      // Broadcast the transaction
      const broadcastEndpoint = 'https://api.blockcypher.com/v1/btc/test3/txs/send';
      const finalTX = await axios.post(broadcastEndpoint, JSON.stringify(tmptx));
  
      if (!finalTX) {
        throw new Error('Create transaction failed');
      }

      const tx_data = {
        tx_id: finalTX.data.tx.hash,
        tx: finalTX.data.tx
      }
  
      return tx_data;
    } catch (error) {
      console.log(error.response.data);
      return new Error('Failed to send BTC test transaction');
    }
};

module.exports = {
    createBTCWallet,
    getBTCWalletBalance,
    getBTCTransactionsOfWallet,
    getBTCTransactionsOfId,
    sendBTCTransaction
}