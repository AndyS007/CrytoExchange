import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import coinReducer from '../features/coins/coinSlice'
import walletReducer from '../features/wallets/walletSlice'
import verificationReducer from '../features/verification/verificationSlice'
import transferReducer from '../features/transfers/transferSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coins: coinReducer,
    wallets: walletReducer,
    transfers: transferReducer,
    verification: verificationReducer
  },
})