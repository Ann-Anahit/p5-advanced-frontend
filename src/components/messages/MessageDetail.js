import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMessage } from '../../api/messages';
import styles from '../../styles/Messages.module.css';

const MessageDetail = ({ token }) => {
    const { id } = useParams();
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchMessageDetail = async () => {
            try {
                const data = await fetchMessage(id, token);
                setMessage(data);
            } catch (error) {
                console.error('Error fetching message:', error);
            }
        };

        if (id) {
            fetchMessageDetail();
        } else {
            console.error('Error: Message ID is not defined.');
        }
    }, [id, token]);

    if (!message) return <p>Loading...</p>;

    return (
        <div className={styles.messageDetail}>
            <h2>Message Detail</h2>
            <p><strong>From:</strong> {message.sender}</p>
            <p><strong>Content:</strong> {message.content}</p>
            <p><strong>Created At:</strong> {new Date(message.created_at).toLocaleString()}</p>
            <p><strong>Updated At:</strong> {new Date(message.updated_at).toLocaleString()}</p>
        </div>
    );
};

export default MessageDetail;
