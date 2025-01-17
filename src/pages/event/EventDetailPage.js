import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Events from "./Events";

function EventDetailPage() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await axiosReq.get(`/event/${id}`);
                setEvent(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchEvent();
    }, [id]);

    return (
        <div>
            {event ? (
                <Events {...event} eventPage={true} />
            ) : (
                <p>Loading event details...</p>
            )}
        </div>
    );
}

export default EventDetailPage;
