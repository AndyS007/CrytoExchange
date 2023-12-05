import btcIcon from "../assets/bitcoin.webp";
import ethIcon from "../assets/ethereum.webp";
import maticIcon from '../assets/matic-icon.webp';
import arbIcon from '../assets/arb.webp';

export const toWalletObject = (wallets) => {
    const walletObject = {};
    wallets.forEach((wallet) => {
        switch (wallet.currency) {
            case 'BTC':
                const btcWallet = {
                    currency: wallet.currency,
                    balance: wallet.balance,
                    address: wallet.address,
                    imgSrc: btcIcon
                }
                walletObject['BTC'] = btcWallet;
                break;
            case 'ETH':
                const ethWallet = {
                    currency: wallet.currency,
                    balance: wallet.balance,
                    address: wallet.address,
                    imgSrc: ethIcon
                }
                walletObject['ETH'] = ethWallet;
                break;
            case 'MATIC':
                const maticWallet = {
                    currency: wallet.currency,
                    balance: wallet.balance,
                    address: wallet.address,
                    imgSrc: maticIcon
                }
                walletObject['MATIC'] = maticWallet;
                break;
            case 'ARB':
                const arbWallet = {
                    currency: wallet.currency,
                    balance: wallet.balance,
                    address: wallet.address,
                    imgSrc: arbIcon
                }
                walletObject['ARB'] = arbWallet;
                break;
        }
    });
    
    return walletObject;
}

export const cryptoIcons = {
    BTC: btcIcon,
    ETH: ethIcon,
    MATIC: maticIcon,
    ARB: arbIcon
}

export const calculateValue = (coins, currency, amount) => {
    let nonce = 0;
    switch (currency) {
        case 'BTC':
            nonce = coins['bitcoin'].usd * amount;
            break;
        case 'ETH':
            nonce = coins['ethereum'].usd * amount;
            break;
        case 'MATIC':
            nonce = coins['matic-network'].usd * amount;
            break;
        case 'ARB':
            nonce = coins['arbitrum'].usd * amount;
    }

    return nonce;
}

export const getCoinPrice = (coins, type, currency) => {
    let price = 0;
    switch (currency) {
        case 'BTC':
            price = coins['bitcoin'][type];
            break;
        case 'ETH':
            price = coins['ethereum'][type];
            break;
        case 'MATIC':
            price = coins['matic-network'][type];
            break;
        case 'ARB':
            price = coins['arbitrum'][type];
    }

    return price;
}