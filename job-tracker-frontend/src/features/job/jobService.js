import axios from 'axios';

const DEV = process.env.NEXT_PUBLIC_DEV;
const API_URL = DEV
  ? process.env.NEXT_PUBLIC_DEV_API
  : process.env.NEXT_PUBLIC_PROD_API;

export const getCategoryJobs = async ({ categoryID }) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.access;

    const config = {
      params: {
        category: categoryID,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await axios.get(`${API_URL}/job/category/`, config);

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getImageAccess = async (job_id) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.access}`,
      },
    };

    const res = await axios.get(
      `${API_URL}/job/access-image/${job_id}`,
      config
    );

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

export const createJob = async (formData) => {
  try {
    const payload = formData;

    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.access}`,
      },
    };

    const res = await axios.post(`${API_URL}/job/`, payload, config);

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};
export const editJob = async (data, jobID) => {
  try {
    const payload = data;
    console.log(data, jobID);

    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.access}`,
      },
    };

    const res = await axios.put(
      `${API_URL}/job/update/${jobID}/`,
      payload,
      config
    );

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteJob = async ({ job_id, category }) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.access}`,
      },
    };

    const res = await axios.delete(
      `${API_URL}/job/remove/${job_id}?category=${category}`,
      config
    );

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

export const getJob = async ({ job_id }) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const config = {
      headers: {
        Authorization: `Bearer ${user.access}`,
      },
    };

    const res = await axios.get(`${API_URL}/job/${job_id}/`, config);

    if (res.data) {
      return res.data;
    }
  } catch (error) {
    throw error;
  }
};

const jobService = {
  getCategoryJobs,
  createJob,
  deleteJob,
  getJob,
  editJob,
};

export default jobService;
