// src/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    // Ambil token secara dinamis setiap request
    const token = localStorage.getItem("token");

    if (token && token !== "null" && token !== "undefined") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("DEBUG: 401 Unauthorized.");

      // Jangan redirect jika kita sedang berada di halaman login (mencegah loop)
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login')) {
         console.warn("Sesi expired atau token tidak valid, mengalihkan ke login...");
         localStorage.removeItem("token");
         localStorage.removeItem("user");
         
         // Redirect ke halaman login yang sesuai
         if (currentPath.startsWith('/hrd') || currentPath.startsWith('/dashboard/hrd')) {
            window.location.href = "/hrd/login"; 
         } else {
            window.location.href = "/login";
         }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
