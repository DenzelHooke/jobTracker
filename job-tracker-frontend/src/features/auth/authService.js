import axios from 'axios';

const DEV = process.env.NEXT_PUBLIC_DEV;
const API_URL = DEV
  ? process.env.NEXT_PUBLIC_DEV_API
  : process.env.NEXT_PUBLIC_PROD_API;

const registerUser = async ({ email, password }) => {
  console.log('API: ', API_URL);
  const payload = { email, password };
  const res = await axios.post(`${API_URL}/register/`, payload);
  if (res.data) {
    return res.data;
  }
};

const authService = {
  registerUser,
};

export default authService;
