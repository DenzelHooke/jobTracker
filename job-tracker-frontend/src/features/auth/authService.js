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
    console.log(res);
    localStorage.setItem('user', res.data);
    return res.data;
  }
};

const loginUser = async ({ email, password }) => {
  const payload = {
    email,
    password,
  };
  const res = await axios.post(`${API_URL}/token/`, payload);
  if (res.data) {
    console.log('RESPONSE: ', res);
    localStorage.setItem('user', JSON.stringify(res.data));
    return res.data;
  }
};

const logout = () => {
  console.log('Logging out.');
  localStorage.removeItem('user');
};

const authService = {
  registerUser,
  loginUser,
  logout,
};

export default authService;
