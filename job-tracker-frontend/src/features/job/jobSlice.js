import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import jobService from './jobService';
import { authFailedLoginAgain, unexpectedError } from '@/helpers/auth/auth';

const initialState = {
  jobs: {},
  isJobLoading: false,
  gettingJobs: false,
  isFetchingJobs: true,
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
      try {
        return thunkAPI.rejectWithValue({
          message: message,
          code: error.response.status,
        });
      } catch (error) {
        return thunkAPI.rejectWithValue({
          message: message,
          code: '',
        });
      }
    }
  }
);

export const createJob = createAsyncThunk(
  'job/createJob',
  async (formData, thunkAPI) => {
    try {
      return await jobService.createJob(formData);
    } catch (error) {
      const message = error.message || error.toString();

      try {
        return thunkAPI.rejectWithValue({
          message: message,
          code: error.response.status,
        });
      } catch (error) {
        return thunkAPI.rejectWithValue({
          message: message,
          code: '',
        });
      }
    }
  }
);

export const editJob = createAsyncThunk(
  'job/editJob',
  async ({ data, jobID }, thunkAPI) => {
    try {
      return await jobService.editJob(data, jobID);
    } catch (error) {
      const message = error.message || error.toString();

      try {
        return thunkAPI.rejectWithValue({
          message: message,
          code: error.response.status,
        });
      } catch (error) {
        return thunkAPI.rejectWithValue({
          message: message,
          code: '',
        });
      }
    }
  }
);

export const deleteJob = createAsyncThunk(
  'job/deleteJob',
  async ({ job_id, category }, thunkAPI) => {
    try {
      return await jobService.deleteJob({ job_id, category });
    } catch (error) {
      const message = error.message || error.toString();

      try {
        return thunkAPI.rejectWithValue({
          message: message,
          code: error.response.status,
        });
      } catch (error) {
        return thunkAPI.rejectWithValue({
          message: message,
          code: '',
        });
      }
    }
  }
);

export const getJob = createAsyncThunk(
  'job/getJob',
  async ({ job_id }, thunkAPI) => {
    try {
      return await jobService.getJob({ job_id });
    } catch (error) {
      const message = error.message || error.toString();

      try {
        return thunkAPI.rejectWithValue({
          message: message,
          code: error.response.status,
        });
      } catch (error) {
        return thunkAPI.rejectWithValue({
          message: message,
          code: '',
        });
      }
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
      state.fetchJobs = false;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    fetchJobs: (state) => {
      state.isFetchingJobs = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state, action) => {
        state.isJobLoading = true;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isJobError = true;
        try {
          if (action.payload.code === 401) {
            state.jobMessage = authFailedLoginAgain();
          }
        } catch (error) {
          state.jobMessage = unexpectedError();
        }
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isJobSuccess = true;
        state.jobMessage = 'Job created successfully!';
      })

      .addCase(editJob.fulfilled, (state) => {
        state.fetchJobs = true;
        state.isJobError = false;
        state.jobMessage = '';
      })
      .addCase(editJob.rejected, (state, action) => {
        state.isJobError = true;
        try {
          if (action.payload.code === 401) {
            state.jobMessage = authFailedLoginAgain();
          }
        } catch (error) {
          state.jobMessage = unexpectedError();
        }
      })

      .addCase(getCategoryJobs.pending, (state) => {
        state.gettingJobs = true;
        state.fetchJobs = true;
      })
      .addCase(getCategoryJobs.fulfilled, (state, action) => {
        state.gettingJobs = false;
        state.isFetchingJobs = false;
        state.isJobError = false;
        state.jobs = action.payload.jobs;
      })
      .addCase(getCategoryJobs.rejected, (state, action) => {
        state.gettingJobs = false;
        state.isFetchingJobs = false;
        state.jobs = {};
        state.isJobError = true;

        try {
          if (action.payload.code === 401) {
            state.jobMessage = authFailedLoginAgain();
          }
        } catch (error) {
          state.jobMessage = unexpectedError();
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
        state.jobMessage = action.payload.message;
      })

      .addCase(getJob.fulfilled, (state, action) => {
        // state.isJobSuccess = true;
        // state.isJobError = false;
        // state.jobMessage = 'aaa';
        state.currentJob = action.payload[0];
        // console.log(action);
      })
      .addCase(getJob.rejected, (state, action) => {
        console.log(action);
        state.isJobError = true;
        // state.jobMessage = action.payload.message;
      });
  },
});

export const { resetJobState, setCategory, fetchJobs } = jobSlice.actions;
export default jobSlice.reducer;
