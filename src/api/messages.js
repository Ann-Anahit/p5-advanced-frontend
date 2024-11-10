import { axiosReq } from './axiosDefaults';

// Fetch messages between the sender (current logged-in user) and recipient
export const fetchMessages = async (recipientId) => {
    try {
        // Make a GET request to retrieve messages for the current user and recipient
        const response = await axiosReq.get(`/messages/${recipientId}/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

// Send a message from sender to recipient
export const sendMessage = async (recipientId, content) => {
    try {
        // POST request to send a message
        const response = await axiosReq.post(`/messages/${recipientId}/send/`, {
            content: content  // Send the message content
        });
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};
