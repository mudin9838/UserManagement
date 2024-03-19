// api.js

import axios from 'axios';

const instance = axios.create({
  baseURL: "https://usermsapi.azurewebsites.net",
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      console.log(error)
    }
    return Promise.reject(error);
  }
);

export default instance;
