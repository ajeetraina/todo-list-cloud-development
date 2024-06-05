import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this matches the backend server URL and port
});

export default instance;
