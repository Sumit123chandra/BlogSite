import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Update this to your backend URL
  withCredentials: true, // for sending cookies if needed
});

export default instance;
