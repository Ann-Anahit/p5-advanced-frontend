// src/components/messages/Message.js
import React, { useState } from 'react';
import { axiosReq } from '../../api/axiosDefaults';
import styles from '../../styles/Message.module.css';
import Avatar from '../Avatar';
import MessageEditForm from './MessageEditForm';

const Message = ({ id, sender, sender_image, created_at, content, setMessages }) => {
    const [showEditForm, setShowEditForm] = useState(false);

    const handleDelete = async () => {
        try {
            await axiosReq.delete(`/messages/${id}/`);
            setMessages((prevMessages) => ({
                ...prevMessages,
                results: prevMessages.results.filter((message) => message.id !== id),
            }));
        } catch (err) {
            console.error('Error deleting message:', err);
        }
    };

    return (
        <div className={styles.Message}>
            <div className={styles.Media}>
                <Avatar src={sender_image} />
                <div className="ml-2">
                    <span className={styles.Sender}>{sender}</span>
                    <span className={styles.Date}>{created_at}</span>
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
