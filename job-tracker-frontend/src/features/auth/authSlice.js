import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const isServer = typeof window === 'undefined';

let user;
let rtcToken;

if (!isServer) {
  user = localStorage.getItem('user');
  rtcToken = localStorage.getItem('rtcToken');
}

//* ─── App State ──────────────────────────────────────────────────────────────────

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  rtcToken: rtcToken ? rtcToken : null,
  message: '',
};

//* ─── Reducers ──────────────────────────────────────────────────────────────────
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password }, thunkAPI) => {
    try {
      console.log('calling register reducer');
      // console.log('AFTER CALL');
      return await authService.registerUser({
        email: email,
        password: password,
      });
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//* ─── Slice ──────────────────────────────────────────────────────────────────
export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    resetAuth: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

const { resetAuth } = authSlice.actions;

export default authSlice.reducer;
