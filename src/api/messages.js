import axios from 'axios';

// Base URL for your API
const API_URL = 'https://8000-annanahit-drfapi-niz9191cenx.ws.codeinstitute-ide.net/messages/';

// Create axios instance with default settings
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getMessages = async (userId, token) => {
    if (!userId || !token) {
        throw new Error('User ID and token are required');
    }

    try {
        const response = await axiosInstance.get('', {
            headers: { 'Authorization': `Bearer ${token}` },
            params: { user: userId },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const fetchConversation = async (receiverId, token) => {
    console.log("Receiver ID:", receiverId);
    console.log("Token:", token);

    if (!receiverId || !token) {
        throw new Error('Receiver ID and token are required');
    }

    try {
        const response = await axiosInstance.get(`/conversation/${receiverId}/`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching conversation:', error);
        throw error;
    }
};
