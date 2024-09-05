// src/components/messages/MessageDetail.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMessage } from '../../api/messages';
import styles from '../../styles/messages.module.css';

const MessageDetail = () => {
    const { id } = useParams();
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchMessage = async () => {
            try {
                const response = await getMessage(id);
                setMessage(response.data);
            } catch (error) {
                console.error('Error fetching message:', error);
            }
        };
        fetchMessage();
    }, [id]);

    if (!message) return <p>Loading...</p>;

    return (
        <div className={styles.messageDetail}>
            <h2>Message Detail</h2>
            <p><strong>From:</strong> {message.sender.username}</p>
            <p><strong>Content:</strong> {message.content}</p>
            <p><strong>Timestamp:</strong> {new Date(message.timestamp).toLocaleString()}</p>
        </div>
    );
};

export default MessageDetail;
