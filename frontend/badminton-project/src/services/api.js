import axios from "axios";

// 🔥 Create axios instance
const API = axios.create({
  baseURL: "http://localhost:5002/api", // change port if needed
  withCredentials: true, // important if using cookies
});

// Optional: Request interceptor (future use)
API.interceptors.request.use(
  (config) => {
    // You can attach token here later if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Response interceptor (future error handling)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized");
    }
    return Promise.reject(error);
  }
);

export default API;