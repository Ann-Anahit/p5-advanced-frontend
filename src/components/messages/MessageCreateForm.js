import React, { useState } from "react";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/MessageCreateForm.module.css";

const MessageCreateForm = ({ receiver_id, setMessages }) => {
    const [content, setContent] = useState("");
    const currentUser = useCurrentUser();

    const handleChange = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axiosRes.post("/messages/", {
                content,
                receiver: receiver_id,
            });
            setMessages((prevMessages) => ({
                ...prevMessages,
                results: [data, ...prevMessages.results],
            }));
            setContent("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.Form}>
            <div className="d-flex">
                <Avatar src={currentUser?.profile_image} />
                <textarea
                    className={styles.FormInput}
                    placeholder="Type a message..."
                    value={content}
                    onChange={handleChange}
                    rows={2}
                />
            </div>
            <button
                className={`${styles.Button} btn d-block ml-auto`}
                disabled={!content.trim()}
                type="submit"
            >
                Send
            </button>
        </form>
    );
};

export default MessageCreateForm;
