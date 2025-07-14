import axios from 'axios';

// Use the environment variable with a fallback value
const API_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Enable cookies for all requests
    timeout: 30000, // 30 seconds timeout
});

// Function to send a message
const testReceive = () => {
    return axiosInstance.get('test/', {});
};

const getGPTResponse = (query) => {
    return axiosInstance.post('gpt_call/', { "query": query }, {})
}

const api = {
    testReceive,
};

export default api; 