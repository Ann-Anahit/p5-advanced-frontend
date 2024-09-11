import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';  // Assuming you're using react-router for navigation

const MessageList = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const history = useHistory();  // Hook for navigation

    const fetchMessages = async () => {
        const token = localStorage.getItem('token');
        console.log('Token:', token);  // Debugging: Log the token

        if (!token) {
            setError("Token not found, please log in.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profiles/messages/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
            }

            const data = await response.json();
            setMessages(data.results);
        } catch (err) {
            console.error('Error fetching messages:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    if (!localStorage.getItem('token')) {
        // Redirect the user to the login page if the token is missing
        setTimeout(() => {
            history.push('/login');  // Navigate to login page after a brief delay
        }, 2000);
        return <p>Token not found, redirecting to login page...</p>;
    }

    return (
        <div>
            {isLoading ? (
                <p>Loading messages...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <ul>
                    {messages.length > 0 ? (
                        messages.map((message) => (
                            <li key={message.id}>{message.content}</li>
                        ))
                    ) : (
                        <p>No messages found.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default MessageList;
