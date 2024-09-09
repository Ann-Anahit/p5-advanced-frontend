import axios from 'axios';

const BASE_API_URL = 'https://8000-annanahit-drfapi-niz9191cenx.ws.codeinstitute-ide.net/';

const axiosInstance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAuthToken = () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
        console.error('Token not found in localStorage.');
    }
    return token;
};

export const getMessages = async (userId, token) => {
    if (!userId || !token) {
        throw new Error('User ID and token are required');
    }

    try {
        const response = await axiosInstance.get('/messages/', {
            headers: { 'Authorization': `Bearer ${token}` },
            params: { user: userId },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const fetchConversation = async (receiverId, token) => {
    if (!receiverId || !token) {
        throw new Error('Receiver ID and token are required');
    }

    try {
        const response = await axiosInstance.get(`/conversation/${receiverId}/`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching conversation:', error.response ? error.response.data : error.message);
        throw error;
    }
};
