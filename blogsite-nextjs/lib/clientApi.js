// lib/clientApi.js
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const client = axios.create({
  baseURL: API_URL,
});

client.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default client;
