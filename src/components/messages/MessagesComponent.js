import React, { useState, useEffect } from 'react';  
import { handleLogin, getMessages } from '../../api/messages'; // Adjust these imports  
import { useHistory } from "react-router-dom";  

const MessagesComponent = ({ userId }) => {  
    const history = useHistory();  
    const [messages, setMessages] = useState([]);  
    const [error, setError] = useState('');  

    useEffect(() => {  
        const fetchMessages = async () => {  
            try {  
                const token = localStorage.getItem('access_token'); // Get the token  
                if (!token) {  
                    throw new Error('Token not found'); // Handle missing token  
                }  
                const fetchedMessages = await getMessages(userId, token); // Fetch messages  
                setMessages(fetchedMessages); // Set the messages state  
            } catch (err) {  
                console.error('Error fetching messages:', err);  
                setError('Failed to fetch messages, please log in again.'); // Set error message  
            }  
        };  

        fetchMessages(); // Call fetch messages on component mount  
    }, [userId]); // Depend on userId if it changes  

    return (  
        <div>  
            {error && <p>{error}</p>}  
            <ul>  
                {messages.map(message => (  
                    <li key={message.id}>{message.content}</li> // Adjust based on your message object structure  
                ))}  
            </ul>  
        </div>  
    );  
};  

export default MessagesComponent;