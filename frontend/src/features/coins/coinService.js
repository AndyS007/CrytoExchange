import axios from 'axios'

const API_URL = 'https://api.coingecko.com/api/v3/'

// Get coin infomation
const getCoins = async (token) => {

  const response = await axios.get(API_URL + 'simple/price', {
    params: {
        ids: 'bitcoin,ethereum,matic-network,arbitrum',
        vs_currencies: 'usd,hkd'
    }
  })

  return response.data
}

const coinService = {
  getCoins,
}

export default coinService