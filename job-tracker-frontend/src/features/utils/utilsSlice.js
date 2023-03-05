import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isError: false,
  isSuccess: false,
  message: '',
};

export const utilsSlice = createSlice({
  name: 'utils',
  initialState: initialState,
  reducers: {
    setError: (state, action) => {
      if (!action.payload) {
        throw new Error('Please include a message before calling setError!');
      }

      state.isError = true;
      state.message = action.payload;
    },
    setSuccess: (state, action) => {
      if (!action.payload) {
        throw new Error('Please include a message before calling setSuccess');
      }

      state.isSuccess = true;
      state.message = action.payload;
    },
    resetState: (state, action) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {},
});

export const { setError, resetState, setSuccess } = utilsSlice.actions;
export default utilsSlice.reducer;
