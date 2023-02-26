import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import utilsReducer from '../features/utils/utilsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    utils: utilsReducer,
  },
});

export default store;
