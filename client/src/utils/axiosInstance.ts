import axios from 'axios';
import { toast } from 'react-toastify';

const axiosInstance = axios.create();


axiosInstance.interceptors.response.use(
  (response) => {
    toast.success(response.data.message);
    return response;
  },
  (error) => {
    if (error.response) {
      toast.error(error.response.data.error || error.response);
    } else {
      toast.error('An error occurred. Please try again.');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
