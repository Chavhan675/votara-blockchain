import axios from "axios";

const API = "http://localhost:5000/api";

// 🔥 LOGIN
export const login = async (credentials) => {
  const res = await axios.post(`${API}/auth/login`, credentials);
  return res.data;
};

// 🔥 REGISTER
export const register = async (data) => {
  const res = await axios.post(`${API}/auth/register`, data);
  return res.data;
};

// 🔥 GET PROFILE (FIXED)
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No token");

  const res = await axios.get(`${API}/auth/profile`, { // ✅ FIXED HERE
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};