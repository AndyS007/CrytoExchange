import axios from 'axios'

const API_URL = '/api/wallets/'

// Create new walletss
const createWallets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, {}, config);

  return response.data
}

// Get user wallets
const getWallets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const walletService = {
  getWallets,
  createWallets
}

export default walletService