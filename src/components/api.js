

import axios from 'axios';



const api = axios.create({
  baseURL: 'https://taskts.vercel.app', // رابط الباك اند
  withCredentials: true, 
});

export default api;
 
