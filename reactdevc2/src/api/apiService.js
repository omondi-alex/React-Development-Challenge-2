import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

// Add an interceptor to add authorization header to every request

export default apiService;
