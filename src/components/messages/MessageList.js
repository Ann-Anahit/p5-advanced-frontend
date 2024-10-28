import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";

const MessagesList = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await axiosReq.get("/messages/");
                console.log("Fetched data:", data); // Add this line
                setMessages(data);
            } catch (err) {
                console.error("Error fetching messages:", err);
            }
        };
        fetchMessages();
    }, []);

    return (
        <div>
            {messages.length > 0 ? (
                messages.map((message) => (
                    <div key={message.id}>
                        <p>{message.content}</p>
                    </div>
                ))
            ) : (
                <p>No messages to display</p>
            )}
        </div>
    );
};

export default MessagesList;
