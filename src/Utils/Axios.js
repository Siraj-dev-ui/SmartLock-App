import axiosIns from 'axios';
import {BASE_URL_LOCAL, BASE_URL_LIVE} from './Urls';

export const axios = axiosIns.create({
  baseURL: BASE_URL_LOCAL,
});

// ✅ Add request interceptor
axios.interceptors.request.use(
  request => {
    console.log(
      `[API Request] ${request.method?.toUpperCase()} ${request.baseURL}${
        request.url
      }`,
    );
    console.log('Payload:', request.data || request.params);
    return request;
  },
  error => {
    console.error('[Request Error]', error);
    return Promise.reject(error);
  },
);

// ✅ Add response interceptor (optional)
axios.interceptors.response.use(
  response => {
    console.log(`[API Response] ${response.status} ${response.config.url}`);
    console.log('Response Data: ', response.data);
    return response;
  },
  error => {
    console.error('[Response Error]', error.response?.data || error.message);
    return Promise.reject(error);
  },
);
