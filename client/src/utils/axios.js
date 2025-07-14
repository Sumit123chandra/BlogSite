import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://blogsite-fxsk.onrender.com/api', // Update this to your backend URL
  withCredentials: true, // for sending cookies if needed
});

export default instance;
