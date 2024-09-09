import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/MessageEditForm.module.css";

const MessageEditForm = ({ id, content, setShowEditForm, setMessages, receiverUsername }) => { // Added receiverUsername as a prop
    const [formContent, setFormContent] = useState(content);

    const handleChange = (e) => {
        setFormContent(e.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosRes.post("/messages/", {
                content: formContent,
                receiver: receiverUsername,
            });
            setMessages((prevMessages) => [data, ...prevMessages]);
            setFormContent("");
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
