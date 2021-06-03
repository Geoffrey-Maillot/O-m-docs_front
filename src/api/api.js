import axios from 'axios';

export default axios.create({
  baseURL: process.env.BASE_URL_LOCAL,
  timeout: 3000,
});
