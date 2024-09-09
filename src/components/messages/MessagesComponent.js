import React, { useEffect, useState } from "react";
import { getMessages } from "../../api/messages";

const MessagesComponent = () => {
    const [messages, setMessages] = useState([]);
    const userId = 'admin';
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                if (userId && token) {
                    const data = await getMessages(userId, token);
                    setMessages(data);
                } else {
                    console.warn('User ID or token is not available');
                }
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };

        fetchMessages();
    }, [userId, token]);

    return (
        <div>
            {messages.length > 0 ? (
                <ul>
                    {messages.map((message) => (
                        <li key={message.id}>{message.content}</li>
                    ))}
                </ul>
            ) : (
                <p>No messages found.</p>
            )}
        </div>
    );
};

export default MessagesComponent;
