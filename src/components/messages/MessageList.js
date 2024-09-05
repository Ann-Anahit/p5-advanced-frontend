import React, { useEffect, useState } from 'react';
import { getMessages } from '../../api/messages';
import styles from '../../styles/messages.module.css';

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is still mounted

    const fetchMessages = async () => {
      try {
        const response = await getMessages();
        if (isMounted) { // Check if the component is still mounted
          setMessages(response.data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.messageList}>
      <h2>Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            {message.content} - {message.sender.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageList;