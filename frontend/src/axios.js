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

const getGPTResponse = (query, chatSessionId) => {
    return axiosInstance.post('gpt_call/', { "query": query, "chat_session_id": chatSessionId }, {})
}

const createChatSession = () => {
    return axiosInstance.post('create_chat_session/', {});
}

// Upload a .txt file along with an optional query
// const uploadTxtFile = (query, file) => {
//     const formData = new FormData();
//     formData.append('query', query);
//     formData.append('file', file);

//     return axiosInstance.post('gpt_call_with_files/', formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data',
//         },
//     });
// }

const api = {
    testReceive,
    getGPTResponse,
    createChatSession,
    // uploadTxtFile,
};

export default api; 