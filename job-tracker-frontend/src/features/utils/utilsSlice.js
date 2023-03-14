import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isError: false,
  isSuccess: false,
  message: '',
  redirect: null,
};

export const utilsSlice = createSlice({
  name: 'utils',
  initialState: initialState,
  reducers: {
    setError: (state, action) => {
      if (!action.payload) {
        console.error('Must add payload before calling.');
      }

      state.isError = true;
      state.message = action.payload;
    },
    setSuccess: (state, action) => {
      if (!action.payload) {
        console.error('Must add payload before calling.');
      }

      state.isSuccess = true;
      state.message = action.payload;
    },
    resetState: (state, action) => {
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    redirect: (state, action) => {
      console.log('redirect called');
      state.redirect = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setError, resetState, setSuccess, redirect } =
  utilsSlice.actions;
export default utilsSlice.reducer;
