import axios from 'axios';
import Cookies from 'js-cookie';

const DEV = process.env.NEXT_PUBLIC_DEV;
const API_URL = DEV
  ? process.env.NEXT_PUBLIC_DEV_API
  : process.env.NEXT_PUBLIC_PROD_API;

const registerUser = async ({ email, password }) => {
  try {
    const payload = { email, password };
    const res = await axios.post(`${API_URL}/register/`, payload);

    localStorage.setItem(
      'user',
      JSON.stringify({
        access: res.data.access,
      })
    );
    return res.data;
  } catch (error) {
    // Gets  triggered when getting 401 status code from response automatically.
    throw error;
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
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const authenticate = () => {
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
  authenticate,
};

export default authService;
