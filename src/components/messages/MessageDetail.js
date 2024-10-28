import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import MessageList from "./MessageList";

const MessageDetail = () => {
    const { id } = useParams();
    const [receiver, setReceiver] = useState(null);

    useEffect(() => {
        const fetchReceiver = async () => {
            try {
                const { data } = await axiosReq.get(`/profiles/${id}/`);
                setReceiver(data);
            } catch (err) {
                console.error("Failed to fetch receiver data:", err);
            }
        };

        fetchReceiver();
    }, [id]);

    return (
        <div>
            {receiver ? (
                <MessageList receiver_id={receiver.id} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default MessageDetail;
