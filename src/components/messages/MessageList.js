import React, { useEffect, useState } from 'react';
import { getMessages } from '../../api/messages';
import Message from './Message';

const MessageList = ({ userId }) => {
    const [messages, setMessagesState] = useState({ results: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('Token not found');
                }

                const data = await getMessages(userId, token);
                setMessagesState(data);
            } catch (err) {
                console.error('Error fetching messages:', err);
                setError('Failed to fetch messages.');
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [userId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {messages.results.length > 0 ? (
                messages.results.map((message) => (
                    <Message
                        key={message.id}
                        id={message.id}
                        sender={message.sender}
                        sender_image={message.sender_image}
                        created_at={message.created_at}
                        content={message.content}
                        setMessages={setMessagesState}
                    />
                ))
            ) : (
                <p>No messages</p>
            )}
        </div>
    );
};

export default MessageList;
