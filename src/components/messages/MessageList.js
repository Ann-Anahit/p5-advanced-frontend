import React, { useEffect, useState } from "react";
import { getMessages } from "../../api/messages";
import Message from "./Message";

const MessageList = ({ userId, token }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || !token) {
      setError('User ID and token are required.');
      setLoading(false);
      return;
    }

    const fetchMessages = async () => {
      console.log("User ID:", userId); // Debugging line
      console.log("Token:", token);    // Debugging line
      setLoading(true);
      setError(null);

      try {
        const { results } = await getMessages(userId, token);
        setMessages(results);
      } catch (err) {
        console.error('Error fetching messages:', err.response ? err.response.data : err.message);
        setError('Failed to fetch messages.');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [userId, token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {messages.length > 0 ? (
        messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            sender={message.sender}
            created_at={message.created_at}
            content={message.content}
          />
        ))
      ) : (
        <p>No messages</p>
      )}
    </div>
  );
};

export default MessageList;
