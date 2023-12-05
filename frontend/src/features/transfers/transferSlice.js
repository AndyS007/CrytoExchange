import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import transferService from './transferService'

const initialState = {
  transfers: [],
  isError: false,
  isCreateError: false,
  isSuccess: false,
  isCreateSuccess: false,
  isCreateFailed: false,
  isLoading: false,
  message: '',
}

// Create new transfer
export const createTransfer = createAsyncThunk(
  'transfers/create',
  async (transferData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await transferService.createTransfer(transferData, token);
      if (!response._id) {
        throw new Error(`Transfer failed: ${response.message}`);
      }
      return response;
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

// Get user transfers
export const getTransfers = createAsyncThunk(
  'transfers/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await transferService.getTransfers(token)
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

export const transferSlice = createSlice({
  name: 'transfer',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransfer.pending, (state) => {
        state.isLoading = true
        state.isCreateSuccess = false
        state.isCreateFailed = false
      })
      .addCase(createTransfer.fulfilled, (state, action) => {
        state.isLoading = false
        state.isCreateSuccess = true
        state.transfers.push(action.payload)
        state.isCreateError = false
      })
      .addCase(createTransfer.rejected, (state, action) => {
        state.isLoading = false
        state.isCreateFailed = true
        state.message = action.payload
      })
      .addCase(getTransfers.pending, (state) => {
        state.isLoading = true
        state.isSuccess = false
        state.isCreateSuccess = false
        state.isCreateFailed = false
      })
      .addCase(getTransfers.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.transfers = action.payload
        state.isCreateError = false
      })
      .addCase(getTransfers.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
        state.isCreateError = false
      })
  },
})

export const { reset } = transferSlice.actions
export default transferSlice.reducer