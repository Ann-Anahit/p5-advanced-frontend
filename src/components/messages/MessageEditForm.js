import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/MessageEditForm.module.css";

const MessageEditForm = ({ id, content, setShowEditForm, setMessages }) => {
    const [formContent, setFormContent] = useState(content);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosRes.post("/messages/", { content: formContent });
            setMessages((prevMessages) => [data, ...prevMessages]);
            setFormContent("");
        } catch (err) {
            console.error('Error editing message:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.EditForm}>
            {/* Form structure here */}
        </form>
    );
};

export default MessageEditForm;
