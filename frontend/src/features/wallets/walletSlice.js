import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import walletService from './walletService'

const initialState = {
  wallets: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new wallets
export const createWallets = createAsyncThunk(
  'wallets/createWallets',
  async (token, thunkAPI) => {
    try {
      return await walletService.createWallets(token)
    } catch (error) {
      console.log(error); 
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user wallets
export const getWallets = createAsyncThunk(
  'wallets/getWallets',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await walletService.getWallets(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createWallets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createWallets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.wallets.push(...action.payload)
      })
      .addCase(createWallets.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getWallets.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWallets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.wallets = action.payload
      })
      .addCase(getWallets.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = walletSlice.actions
export default walletSlice.reducer