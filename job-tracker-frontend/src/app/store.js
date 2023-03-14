import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import utilsReducer from '../features/utils/utilsSlice';
import jobReducer from '../features/job/jobSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    utils: utilsReducer,
    jobs: jobReducer,
  },
});

export default store;
