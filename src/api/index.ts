import { message } from 'antd';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com/repos/',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.status.message === 500) {
      message.error('Oops, something went wrong!');
    }
    return Promise.reject(error.response);
  }
);

export default api;
