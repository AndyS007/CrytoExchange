const ONE_HUNDRED_MILLION = 100000000;

const convertSatoshisToBTC = (satoshis) => {
    return satoshis / ONE_HUNDRED_MILLION;
}

const convertBTCToSatoshis = (btc) => {
    return btc * ONE_HUNDRED_MILLION;
}

module.exports = {
    convertSatoshisToBTC,
    convertBTCToSatoshis
}