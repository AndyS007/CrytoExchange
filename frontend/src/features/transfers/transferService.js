import axios from 'axios'

const API_URL = '/api/transfers/'

// Create new goal
const createTransfer = async (transferData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, transferData, config)

  return response.data
}

// Get user transfers
const getTransfers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

const transferService = {
    createTransfer,
    getTransfers
}

export default transferService