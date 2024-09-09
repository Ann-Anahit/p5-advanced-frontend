import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

const MessageForm = ({ receiver_id, setMessages }) => {
    const [content, setContent] = useState("");

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!content.trim()) return; 

        try {
            const { data } = await axiosReq.post("/messages/", {
                content,
                receiver: receiver_id,
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
