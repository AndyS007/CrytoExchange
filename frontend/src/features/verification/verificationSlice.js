import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import verificationService from './verificationService'

// const verification = JSON.parse(localStorage.getItem('verification'))

const initialState = {
    verification: null,//verification ? verification : null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
}

// verify user
export const verify = createAsyncThunk(
  'verification/verify',
  async (verification, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await verificationService.verify(verification, token)
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

export const verificationSlice = createSlice({
  name: 'verification',
  initialState,
  reducers: {
    reset: (state) => {
      state.verification = null
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(verify.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.verification = action.payload
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(verify.rejected, (state, action) => {
        state.verification = null
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = verificationSlice.actions
export default verificationSlice.reducer
