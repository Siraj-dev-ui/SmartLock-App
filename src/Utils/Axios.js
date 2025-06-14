import axiosIns from 'axios';
import {BASE_URL_LOCAL, BASE_URL_LIVE} from './urls';

export const axios = axiosIns.create({
  baseURL: BASE_URL_LIVE,
});
