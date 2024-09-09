import React, { useState } from 'react';
import { getAuthToken } from '../../api/messages';
import axios from 'axios';
import styles from '../../styles/Message.module.css';
import Avatar from '../Avatar';
import MessageEditForm from './MessageEditForm';

const Message = ({ id, sender, sender_image, created_at, content, setMessages }) => {
    const [showEditForm, setShowEditForm] = useState(false);

    const handleDelete = async () => {
        const token = getAuthToken();

        if (!token) {
            console.error('No authentication token found');
            return;
        }

        try {
            await axios.delete(`https://8000-annanahit-drfapi-niz9191cenx.ws.codeinstitute-ide.net/messages/${id}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
            <div className={styles.Media}>
                <Avatar src={sender_image} />
                <div className="ml-2">
                    <span className={styles.Sender}>{sender}</span>
                    <span className={styles.Date}>{new Date(created_at).toLocaleString()}</span>
                    {showEditForm ? (
                        <MessageEditForm
                            id={id}
                            content={content}
                            setShowEditForm={setShowEditForm}
                            setMessages={setMessages}
                        />
                    ) : (
                        <p>{content}</p>
                    )}
                </div>
                <div className="ml-auto">
                    <button onClick={() => setShowEditForm(true)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Message;
