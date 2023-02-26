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
    resetError: (state, action) => {
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: {},
});

export const { setError, resetError } = utilsSlice.actions;
export default utilsSlice.reducer;
