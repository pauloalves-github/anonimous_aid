import axios from 'axios';

const api = axios.create({
  baseURL: 'https://us-central1-anonibus-3t.cloudfunctions.net',
});

export default api;