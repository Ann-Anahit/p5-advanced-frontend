// src/components/messages/MessageInput.js
import React, { useState } from 'react';

const MessageInput = () => {
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Message submitted:', message);
        setMessage('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={handleChange}
                    placeholder="Type your message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default MessageInput;
