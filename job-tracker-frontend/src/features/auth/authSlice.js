import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const isServer = typeof window === 'undefined';

let user;
let rtcToken;

if (!isServer) {
  user = localStorage.getItem('user');
  rtcToken = localStorage.getItem('rtcToken');
}

//* ─── Reducers ──────────────────────────────────────────────────────────────────
const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const res = authService.registerUser();
      if (res) {
        return res;
      }
    } catch (error) {
      const message =
        (error.message && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

//* ─── App State ──────────────────────────────────────────────────────────────────

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  rtcToken: rtcToken ? rtcToken : null,
  message: '',
};

//* ─── Slice ──────────────────────────────────────────────────────────────────
export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
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

export default authSlice.reducer;
