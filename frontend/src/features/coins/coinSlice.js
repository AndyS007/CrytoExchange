import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import coinService from './coinService'

const initCoins = {
    "arbitrum": {
        "usd": 1.31,
        "hkd": 10.3
    },
    "bitcoin": {
        "usd": 29019,
        "hkd": 227733
    },
    "ethereum": {
        "usd": 1916.13,
        "hkd": 15037.39
    },
    "matic-network": {
        "usd": 0.990902,
        "hkd": 7.78
    }
}

const initialState = {
  coins: initCoins,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Get coin information
export const getCoins = createAsyncThunk(
  'coins/getAll',
  async (_, thunkAPI) => {
    try {
      return await coinService.getCoins();
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

export const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoins.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCoins.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.coins = action.payload
      })
      .addCase(getCoins.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = coinSlice.actions
export default coinSlice.reducer