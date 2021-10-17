import axios from 'axios';

axios.defaults.baseURL = process.env.BASE_URL;

export default axios;
