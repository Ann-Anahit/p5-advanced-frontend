import React, { useState, useEffect } from 'react';
import { getMessages } from '../../api/messages';

const MessagesComponent = ({ userId }) => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const fetchedMessages = await getMessages(userId);
                setMessages(fetchedMessages);
            } catch (err) {
                console.error('Error fetching messages:', err);
                setError('Failed to fetch messages.');
            }
        };

        fetchMessages();
    }, [userId]);

    return (
        <div>
            {error && <p>{error}</p>}
            <ul>
                {messages.map(message => (
                    <li key={message.id}>{message.content}</li>
                ))}
            </ul>
        </div>
    );
};

export default MessagesComponent;
