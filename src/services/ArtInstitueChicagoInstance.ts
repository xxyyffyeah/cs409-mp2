import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.artic.edu/api/v1',
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;