import React, { useEffect, useState } from 'react';
import { getMessages, sendMessage } from '../../api/messages';
import styles from '../../styles/Messages.module.css';

const MessageList = ({ userId, token }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessages(userId, token);
        setMessages(data.results || []);
      } catch (error) {
        setError('Failed to load messages.');
        console.error('Error fetching messages:', error);
      }
    };

    if (userId && token) {
      fetchMessages();
    }
  }, [userId, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await sendMessage({ receiver: userId, content: newMessage }, token);
      setNewMessage('');
      const updatedMessages = await getMessages(userId, token);
      setMessages(updatedMessages.results || []);
    } catch (error) {
      setError('Failed to send message.');
      console.error('Error sending message:', error);
    }
  };

  if (error) return <p className={styles.error}>{error}</p>;
  if (messages.length === 0) return <p>No messages found.</p>;

  return (
    <div className={styles.messageList}>
      <h2>Message List</h2>
      <ul>
        {messages.map(message => (
          <li key={message.id} className={styles.messageItem}>
            <p><strong>From:</strong> {message.sender}</p>
            <p><strong>Content:</strong> {message.content}</p>
            <p><strong>Created At:</strong> {new Date(message.created_at).toLocaleString()}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className={styles.messageForm}>
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Write your message..."
          required
        />
        <button type="submit" className={styles.submitButton}>Send</button>
      </form>
    </div>
  );
};

export default MessageList;
