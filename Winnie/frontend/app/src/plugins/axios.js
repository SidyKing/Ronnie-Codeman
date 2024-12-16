import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://voituresuperrapide.pythonanywhere.com/',
  timeout: 5000,
});

export default instance;
