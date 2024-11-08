import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function MessageCreateForm({ setMessages }) {
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState({});
    const currentUser = useCurrentUser();
    const history = useHistory();

    const handleChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosReq.post("/messages/", { content, sender: currentUser.username });
            setMessages((prevMessages) => ({
                ...prevMessages,
                results: [data, ...prevMessages.results],
            }));
            history.push("/messages");
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    value={content}
                    onChange={handleChange}
                    placeholder="Type your message"
                />
            </Form.Group>
            {errors?.content?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Button type="submit">Send</Button>
        </Form>
    );
}

export default MessageCreateForm;
