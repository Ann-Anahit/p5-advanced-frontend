import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/MessageEditForm.module.css";

const MessageEditForm = ({ id, content, setShowEditForm, setMessages }) => {
    const [formContent, setFormContent] = useState(content);

    const handleChange = (e) => {
        setFormContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosRes.put(`/messages/${id}/edit/`, {
                content: formContent.trim(),
            });
            setMessages((prevMessages) => ({
                ...prevMessages,
                results: prevMessages.results.map((message) => {
                    return message.id === id
                        ? { ...message, content: formContent.trim() }
                        : message;
                }),
            }));
            setShowEditForm(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.EditForm}>
            <textarea
                className={styles.FormInput}
                value={formContent}
                onChange={handleChange}
                rows={2}
            />
            <button
                className={`${styles.Button} btn d-block ml-auto`}
                type="submit"
            >
                Save
            </button>
            <button
                className={`${styles.ButtonCancel} btn d-block ml-auto`}
                type="button"
                onClick={() => setShowEditForm(false)}
            >
                Cancel
            </button>
        </form>
    );
};

export default MessageEditForm;
