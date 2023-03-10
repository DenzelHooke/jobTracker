import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jobService from './jobService';

const initialState = {
  jobs: {},
};

// REDUCERS
export const getCategoryJobs = createAsyncThunk(
  'job/getCategoryJobs',
  async ({ categoryID }) => {
    const res = jobService.getCategoryJobs({ categoryID });
  }
);

export const createJob = createAsyncThunk(
  'job/createJob',
  async ({ company, address, email, jobStatus }) => {
    const res = jobService.createJob({ company, address, email, jobStatus });
  }
);
export const jobSlice = createSlice({
  name: 'job',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state.jobs = {};
    },
  },
  extraReducers: (builder) => {},
});

export default jobSlice.reducer;
