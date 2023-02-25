import axios from 'axios';

const DEV = process.env.DEV;
const API_URL = DEV ? process.env.DEV_API : process.env.PROD_API;

export const registerUser = async ({ email, password }) => {
  const res = await axios.post({ email, password });
  if (res.data) {
    return res.data;
  }
};
