import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const MessageCreate = () => {
    const [messageContent, setMessageContent] = useState("");
    const [receiverId, setReceiverId] = useState(""); // Assuming you have a way to select the receiver  
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const postMessage = async () => {
        try {
            const { data } = await axiosReq.post(`/profiles/messages/`, {
                profile: receiverId,
                content: messageContent,
            });
            console.log('Message posted:', data);
            history.push("/messages"); // Redirect after posting  
        } catch (error) {
            console.error('Error posting message:', error);
            setErrors(error.response?.data);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postMessage();
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Receiver</Form.Label>
                <Form.Control
                    type="text"
                    value={receiverId}
                    onChange={(e) => setReceiverId(e.target.value)}
                    placeholder="Enter receiver ID"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control
                    as="textarea"
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    rows={3}
                />
            </Form.Group>
            {errors?.content && <Alert variant="danger">{errors.content}</Alert>}
            <Button type="submit">Send Message</Button>
        </Form>
    );
};

export default MessageCreate;