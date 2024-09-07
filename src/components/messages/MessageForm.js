import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { sendMessage } from '../../api/messages';
import styles from '../../styles/Messages.module.css';

const MessageForm = ({ token }) => {
  const { receiverId } = useParams();
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendMessage({ receiver: receiverId, content }, token);
      setContent('');
      // Optionally show success feedback or redirect
    } catch (error) {
      console.error('Error sending message:', error);
      // Optionally show error feedback to the user
    }
  };

  return (
    <form className={styles.messageForm} onSubmit={handleSubmit}>
      <textarea
        className={styles.inputField}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message here"
        required
      />
      <button className={styles.submitButton} type="submit">Send</button>
    </form>
  );
};

export default MessageForm;
