import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const MessageCreate = () => {
    const [messageContent, setMessageContent] = useState("");
    const [receiverId, setReceiverId] = useState("");
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const postMessage = async () => {
        try {
            const { data } = await axiosReq.post(`/profiles/messages/`, {
                profile: receiverId,
                content: messageContent,
            });
            history.push("/messages");
        } catch (error) {
            setErrors(error.response?.data);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        postMessage();
    };

    return (
        <Form onSubmit={handleSubmit}>
            {/* Form structure here */}
        </Form>
    );
};

export default MessageCreate;
