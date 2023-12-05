import axios from 'axios'

const API_URL = '/api/verification/'

// Verify user
const verify = async (verification, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL + 'verify', verification, config)

  // if (response.data) {
  //   localStorage.setItem('verification', JSON.stringify(response.data))
  // }

  return response.data
}

const verificationService = {
    verify,
}

export default verificationService