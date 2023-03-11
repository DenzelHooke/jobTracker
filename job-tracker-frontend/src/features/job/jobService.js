import axios from 'axios';

const DEV = process.env.NEXT_PUBLIC_DEV;
const API_URL = DEV
  ? process.env.NEXT_PUBLIC_DEV_API
  : process.env.NEXT_PUBLIC_PROD_API;

export const getCategoryJobs = async ({ categoryID }) => {
  const payload = {
    catgory: categoryID,
  };

  return await axios.get(`${API_URL}/job/category/${categoryID}`, payload);
};

export const createJob = async ({ company, address, email, jobStatus }) => {
  const payload = {
    company,
    address,
    email,
    jobStatus,
  };

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user.access);
  const config = {
    headers: {
      Authorization: `Bearer ${user.access}`,
    },
  };

  return await axios.post(`${API_URL}/job/`, payload, config);
};

const jobService = {
  getCategoryJobs: getCategoryJobs,
  createJob: createJob,
};

export default jobService;
