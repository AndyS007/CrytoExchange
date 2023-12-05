const Wallet = require('../../models/walletModel');
const Web3 = require('web3');

// Connect to the Ethereum network via Infura
const infuraEndPoint = `https://arbitrum-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`;
const web3 = new Web3(new Web3.providers.HttpProvider(infuraEndPoint));

// Create ARB wallet
const createArbWallet = () => {
    const account = web3.eth.accounts.create();
    const wallet = {
        currency: 'ARB',
        address: account.address,
        privateKey: account.privateKey,
        balance: 0
    }
    return wallet;
}

// Get wallet balance
const getArbWalletBalance = async (address) => {
    const balanceWei = await web3.eth.getBalance(address);
    const balanceMatic = web3.utils.fromWei(balanceWei, 'ether');
    return balanceMatic;
}

// Send ARB transaction
const sendArbTransaction = async (fromAddress, toAddress, amount) => {
    // Get privateKey
    const { privateKey } = await Wallet.findOne({ address: fromAddress });

    // Estimatic the gas limit
    const limit = await web3.eth.estimateGas({
        from: fromAddress, 
        to: toAddress,
        value: web3.utils.toWei(amount)
    });

    console.log("estimate gas:", limit);
        
    // Creating the transaction object
    const tx = {
        from: fromAddress,
        to: toAddress,
        value: web3.utils.numberToHex(web3.utils.toWei(amount, 'ether')),
        gas: web3.utils.toHex(limit),
        nonce: web3.eth.getTransactionCount(fromAddress),
        maxPriorityFeePerGas: web3.utils.toHex(web3.utils.toWei('1', 'wei')),
    };

    signedTx = await web3.eth.accounts.signTransaction(tx, privateKey)
    console.log("Raw transaction data: " + signedTx.rawTransaction)

    // Sending the transaction to the network
    let tx_data = null;
    try {
        const tx_result = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        tx_data = {
            tx_id: tx_result.transactionHash,
            tx: tx_result
        }
    } catch (error) {
        return new Error(`Send ARB transaction failed. ${error.message}`);
    }

    return tx_data;
}

// Get all transactions of a Polygon address
const getArbTransactionsOfAccount = async (address) => {
    const events = await web3.eth.getPastLogs({
        fromBlock: 0,
        toBlock: 'latest',
        address: address
    });
    return events;
}

// Get a transaction of tx hash
const getArbTransactionsOfId = async (tx_id) => {
    const tx = await web3.eth.getTransaction(tx_id)
    return tx;
}

module.exports = {
    createArbWallet,
    getArbWalletBalance,
    sendArbTransaction
}