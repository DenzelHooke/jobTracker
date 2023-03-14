import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jobService from './jobService';
import { redirect } from '../utils/utilsSlice';
import { authFailedLoginAgain } from '@/helpers/auth/auth';

const initialState = {
  jobs: {},
  isJobLoading: false,
  gettingJobs: false,
  isJobError: false,
  isJobSuccess: false,
  jobMessage: '',
};

// REDUCERS
export const getCategoryJobs = createAsyncThunk(
  'job/getCategoryJobs',
  async ({ categoryID }, thunkAPI) => {
    try {
      return await jobService.getCategoryJobs({ categoryID });
    } catch (error) {
      console.log(error);
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue({
        message: message,
        code: error.response.status,
      });
    }
  }
);

export const createJob = createAsyncThunk(
  'job/createJob',
  async ({ company, address, email, jobStatus }, thunkAPI) => {
    try {
      return await jobService.createJob({ company, address, email, jobStatus });
    } catch (error) {
      console.log(error);
      const message = error.message || error.toString();
      return thunkAPI.rejectWithValue({
        message: message,
        code: error.response.status,
      });
    }
  }
);
export const jobSlice = createSlice({
  name: 'job',
  initialState: initialState,
  reducers: {
    resetJobState: (state) => {
      state.jobs = {};
      state.isJobError = false;
      state.isJobSuccess = false;
      state.isJobLoading = false;
      state.jobMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state, action) => {
        console.log('pending');
      })
      .addCase(createJob.rejected, (state, action) => {
        if (action.payload.code === 401) {
          state.jobMessage = authFailedLoginAgain();
        }
        state.jobMessage = action.payload.message;
        state.isJobError = true;
        console.log('REJECTED');
        console.log(action);
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isJobSuccess = true;
        state.jobMessage = 'Job created successfully!';
      })

      .addCase(getCategoryJobs.pending, (state) => {
        state.gettingJobs = true;
        console.log('GETTING JOBS');
      })
      .addCase(getCategoryJobs.fulfilled, (state, action) => {
        state.gettingJobs = false;
        state.jobs = action.payload.jobs;
      })
      .addCase(getCategoryJobs.rejected, (state, action) => {
        state.gettingJobs = false;
        state.jobs = {};
      });
  },
});

export const { resetJobState } = jobSlice.actions;
export default jobSlice.reducer;
