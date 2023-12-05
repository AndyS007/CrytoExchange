const asyncHandler = require('express-async-handler');
const Wallet = require('../models/walletModel');
const { createBTCWallet, getBTCWalletBalance } = require('./currencies/btc');
const { createEthWallet, getEthWalletBalance } = require('./currencies/eth');
const { createMaticWallet, getMaticWalletBalance } = require('./currencies/matic');
const { createArbWallet, getArbWalletBalance } = require('./currencies/arb'); 

// @desc Get all wallets of user
// @route GET /api/wallets
// @access Private
const getAllWallets = asyncHandler( async (req, res) => {
    
    const wallets = await Wallet.find({ user: req.user.id }).select('-privateKey');

    res.status(200).json(wallets);
})

// @desc Create a all-in-one wallet
// @route POST /api/wallets/
// @access Private
const createWallet = asyncHandler( async (req, res) => {
    let wallets = await Wallet.find( {user: req.user.id} );
    if (wallets.length > 0) {
        console.log(wallets);
        res.status(200).json(wallets);
    } else {
        const btcWallet = createBTCWallet();
        const ethWallet = createEthWallet();
        const maticWallet = createMaticWallet();
        const arbWallet = createArbWallet();
        
        if (!btcWallet.address || !ethWallet.address || !maticWallet.address || !arbWallet.address) {
            res.status(500);
            throw new Error('Create Wallet Failed');
        }
    
        btcWallet['user'] = req.user.id;
        ethWallet['user'] = req.user.id;
        maticWallet['user'] = req.user.id;
        arbWallet['user'] = req.user.id;
        wallets = [btcWallet, ethWallet, maticWallet, arbWallet];
    
        const newWallets = await Wallet.create(wallets);
        console.log(newWallets);
        res.status(200).json(newWallets);
    }
})

// @desc Create a wallet
// @route POST /api/wallets/single
// @access Private
const createSingleWallet = asyncHandler( async (req, res) => {
    const currency = req.body.currency;
    if (!currency) {
        res.status(400);
        throw new Error('Please choose a currency type');
    }

    let wallet;
    switch (currency) {
        case 'BTC':
            wallet = createBTCWallet();
            break;
        case 'ETH':
            wallet = createEthWallet();
            break;
        case 'MATIC':
            wallet = createMaticWallet();
            break;
        case 'ARB':
            wallet = createArbWallet();
            break;
    }

    if (!wallet.address) {
        res.status(500);
        throw new Error('Create wallet failed');
    }

    const newWallet = await Wallet.create({
        user: req.user.id,
        ...wallet
    })

    res.status(200).json(newWallet);
})

// @desc Connect to a wallet
// @route POST /api/wallets/connect
// @access Private
const connectWallet = asyncHandler( async (req, res) => {
    if (!req.body.address) {
        res.status(400);
        throw new Error('Require wallet address');
    }
    // TODO connect to a exist wallet
    res.status(200).json({ message: 'Connect to a Wallet' });
})

// @desc Get data of a wallet
// @route GET /api/wallets/:address
// @access Private
const getWallet = asyncHandler( async (req, res) => {
    if (!req.params.address) {
        res.status(400);
        throw new Error('Require wallet address');
    }

    const wallet = await Wallet.findOne({ address: req.params.address });

    res.status(200).json(wallet);
})

// @desc Get balance a wallet
// @route GET /api/wallets/balance/:address
// @access Private
const getBalance = asyncHandler( async (req, res) => {
    if (!req.params.address) {
        res.status(400);
        throw new Error('Please add wallet address');
    }

    const wallet = await Wallet.findOne({ address: req.params.address });

    if (!wallet) {
        res.status(404);
        throw new Error('Wallet Not Found');
    }

    const currency = wallet.currency;
    // Update and get balance
    const updatedWallet = await updateBalance(wallet.address, currency);

    if (!updatedWallet) {
        res.status(500);
        throw new Error('Get balance failed');
    }
    res.status(200).json(updatedWallet);
})

// Update wallet balance
const updateBalance = async (address, currency) => {
    let current_balance = 0;
    switch (currency) {
        case 'BTC':
            current_balance = await getBTCWalletBalance(address);
            break;
        case 'ETH':
            current_balance = await getEthWalletBalance(address);
            break;
        case 'MATIC':
            current_balance = await getMaticWalletBalance(address);
            break;
        case 'ARB':
            current_balance = await getArbWalletBalance(address);
            break;
    }

    const filter = { address: address };
    const update = { balance: current_balance };
    // Set new as true to return updated result
    const options = { new: true };
  
    const updatedWallet = await Wallet.findOneAndUpdate(filter, update, options).select('-privateKey');

    return updatedWallet;
}

module.exports = {
    getAllWallets,
    createWallet,
    connectWallet,
    getWallet,
    getBalance,
    updateBalance
}