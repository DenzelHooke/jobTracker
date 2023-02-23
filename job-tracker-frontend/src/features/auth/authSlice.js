import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const isServer = typeof window === 'undefined';

let user;

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
  rtcToken: null,
  message: '',
};

//* ─── Slice ──────────────────────────────────────────────────────────────────
export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
});
