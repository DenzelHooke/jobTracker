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
  category: 'applied',
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
  async (formData, thunkAPI) => {
    try {
      return await jobService.createJob(formData);
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

export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async ({ job_id, category }, thunkAPI) => {
    try {
      return await jobService.deleteJob({ job_id, category });
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
      state.isJobError = false;
      state.isJobSuccess = false;
      state.isJobLoading = false;
      state.jobMessage = '';
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state, action) => {
        state.isJobLoading = true;
      })
      .addCase(createJob.rejected, (state, action) => {
        if (action.payload.code === 401) {
          state.jobMessage = authFailedLoginAgain();
        }
        state.isJobError = true;
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
        state.isJobError = true;
        if (action.payload.code === 401) {
          state.jobMessage = authFailedLoginAgain();
        }
      })

      .addCase(deleteJob.pending, (state) => {
        state.isJobLoading = true;
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.isJobLoading = false;
        state.jobs = action.payload.jobs;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.isJobError = true;
        state.jobMessage = action.payload;
      });
  },
});

export const { resetJobState, setCategory } = jobSlice.actions;
export default jobSlice.reducer;
