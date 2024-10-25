import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create();

// axiosInstance.interceptors.request.use(
//   (config) => {
//     toast.info('Loading...');
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.response.use(
  (response) => {
    toast.success(response.data.message);
    return response;
  },
  (error) => {
    if (error.response) {
      toast.error(error.response.data.error);
    } else {
      toast.error('An error occurred. Please try again.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
