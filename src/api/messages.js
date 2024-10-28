import React, { useState } from 'react';
import axios from 'axios';
import styles from '../../styles/Message.module.css';
import Avatar from '../Avatar';
import MessageEditForm from './MessageEditForm';

const Message = ({ id, sender, sender_image, created_at, content, setMessages }) => {
    const [showEditForm, setShowEditForm] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`https://8000-annanahit-drfapi-niz9191cenx.ws.codeinstitute-ide.net/messages/${id}/`);
            setMessages((prevMessages) => ({
                ...prevMessages,
                results: prevMessages.results.filter((message) => message.id !== id),
            }));
        } catch (err) {
            console.error('Error deleting message:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <div className={styles.Message}>
            {/* Component structure here */}
        </div>
    );
};

export default Message;
