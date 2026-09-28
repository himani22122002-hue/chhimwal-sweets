import axios from "axios";

const API_URL = "/api/v1/auth";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

const logout = async () => {
  await axios.post(`${API_URL}/logout`);
};

const getMe = async () => {
  const response = await axios.get(`${API_URL}/me`);
  return response.data;
};

export default {
  register,
  login,
  logout,
  getMe,
};
