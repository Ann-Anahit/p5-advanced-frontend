import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import MessageList from "./MessageList";
import styles from "../../styles/MessageDetail.module.css";  

const MessageDetail = () => {
    const { id } = useParams();  
    const [receiver, setReceiver] = useState(null);
    const [receiverName, setReceiverName] = useState("");

    useEffect(() => {
        const fetchReceiver = async () => {
            try {
                const { data } = await axiosReq.get(`/profiles/${id}/`);
                setReceiver(data);
                setReceiverName(data.username || ""); 
            } catch (err) {
                console.error("Failed to fetch receiver data:", err); 
            }
        };

        fetchReceiver();
    }, [id]);

    return (
        <div className={styles.MessageDetail}>
            {receiver ? (
                <MessageList receiver_id={receiver.id} receiver_name={receiverName} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MessageDetail;
