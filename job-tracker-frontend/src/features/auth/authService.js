import axios from 'axios';
import Cookies from 'js-cookie';

const DEV = process.env.NEXT_PUBLIC_DEV;
const API_URL = DEV
  ? process.env.NEXT_PUBLIC_DEV_API
  : process.env.NEXT_PUBLIC_PROD_API;

const registerUser = async ({ email, password }) => {
  try {
    console.log('API: ', API_URL);
    const payload = { email, password };
    const res = await axios.post(`${API_URL}/register/`, payload);
    if (res.data) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          access: res.data.access,
        })
      );
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async ({ email, password }) => {
  try {
    const payload = {
      email,
      password,
    };
    const res = await axios.post(`${API_URL}/token/`, payload);
    if (res.data) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          access: res.data.access,
        })
      );
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  console.log('Logging out.');
  localStorage.removeItem('user');
};

const auhenticate = () => {
  // const user = JSON.parse(localStorage.getItem('user'));
  // const token = user.access;
  // const config = {
  //   Authorization: `Bearer ${token}`,
  // };
  return axios.get(`${API_URL}/authenticate`);
};

const authService = {
  registerUser,
  loginUser,
  logout,
  auhenticate,
};

export default authService;
