import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const AUTH_API = `${API_URL}/api/v1/auth`;

const axiosConfig = {
  withCredentials: true,
};

const register = async (userData) => {
  const response = await axios.post(
    `${AUTH_API}/register`,
    userData,
    axiosConfig
  );

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(
    `${AUTH_API}/login`,
    userData,
    axiosConfig
  );

  return response.data;
};

const logout = async () => {
  await axios.post(
    `${AUTH_API}/logout`,
    {},
    axiosConfig
  );
};

const getMe = async () => {
  const response = await axios.get(
    `${AUTH_API}/me`,
    axiosConfig
  );

  return response.data;
};

export default {
  register,
  login,
  logout,
  getMe,
};