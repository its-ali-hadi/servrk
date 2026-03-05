import axios from 'axios';

// Get the API URL from environment variables or use the default local address
const BASE_URL = 'https://servrk-api.alihadi.click/api';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
