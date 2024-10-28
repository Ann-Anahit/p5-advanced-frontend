import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

// Function to get cookie by name
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const MessageForm = ({ receiver_id, setMessages }) => {
    const [content, setContent] = useState("");

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!content.trim()) return;

        const csrfToken = getCookie('csrftoken'); // Get the CSRF token

        try {
            const { data } = await axiosReq.post("/messages/", {
                content,
                receiver: receiver_id,
            }, {
                headers: {
                    'X-CSRFToken': csrfToken, // Include CSRF token in headers
                },
            });
            setMessages((prevMessages) => [data, ...prevMessages]);
            setContent(""); 
        } catch (err) {
            console.error("Error sending message:", err);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={content}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    aria-label="Message content"
                />
            </Form.Group>
            <Button
                type="submit"
                disabled={!content.trim()}
                variant="primary" 
            >
                Send
            </Button>
        </Form>
    );
};

export default MessageForm; 
