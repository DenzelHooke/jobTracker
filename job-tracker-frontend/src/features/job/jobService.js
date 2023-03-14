import axios from 'axios';

const DEV = process.env.NEXT_PUBLIC_DEV;
const API_URL = DEV
  ? process.env.NEXT_PUBLIC_DEV_API
  : process.env.NEXT_PUBLIC_PROD_API;

export const getCategoryJobs = async ({ categoryID }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = user.access;
  console.log(categoryID);
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
};

export const createJob = async ({ company, address, email, jobStatus }) => {
  const payload = {
    company,
    address,
    email,
    jobStatus,
  };

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  const config = {
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  };

  const res = await axios.post(`${API_URL}/job/`, payload, config);

  if (res.data) {
    return res.data;
  }
};

const jobService = {
  getCategoryJobs: getCategoryJobs,
  createJob: createJob,
};

export default jobService;
