import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MessageEditForm = ({ id, content, thread_id, setShowEditForm, setMessages }) => {
    const [newContent, setNewContent] = useState(content);

    // Set the initial message content when the component mounts
    useEffect(() => {
        setNewContent(content);
    }, [content]);

    const handleEditSubmit = async () => {
        try {
            // Make a PUT request to update the message
            const response = await axios.put(
                `https://8000-annanahit-drfapi-niz9191cenx.ws.codeinstitute-ide.net/messages/${id}/`,
                {
                    message: newContent,
                    thread_id, // Thread association
                }
            );

            // Update the messages state with the edited message
            setMessages((prevMessages) => ({
                ...prevMessages,
                results: prevMessages.results.map((message) =>
                    message.id === id ? { ...message, message: newContent } : message
                ),
            }));

            // Close the edit form after submission
            setShowEditForm(false);
        } catch (err) {
            console.error('Error updating message:', err.response ? err.response.data : err.message);
        }
    };

    return (
        <div>
            <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows="4" // Adjust rows to control text area size
                placeholder="Edit your message..."
            />
            <button onClick={handleEditSubmit}>Save</button>
            <button onClick={() => setShowEditForm(false)}>Cancel</button>
        </div>
    );
};

export default MessageEditForm;
