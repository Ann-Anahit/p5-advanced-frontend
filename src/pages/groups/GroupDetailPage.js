import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";

function GroupDetailPage() {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [isMember, setIsMember] = useState(false);

    useEffect(() => {
        const fetchGroup = async () => {
            try {
                const { data } = await axiosReq.get(`/groups/${id}`);
                setGroup(data);
                setIsMember(data.is_member);
            } catch (err) {
                console.error("Failed to load group details:", err);
            }
        };
        fetchGroup();
    }, [id]);

    const handleJoin = async () => {
        try {
            await axiosReq.post(`/groups/${id}/join`);
            setIsMember(true);
        } catch (err) {
            console.error("Failed to join group:", err);
        }
    };

    if (!group) return <p>Loading group details...</p>;

    return (
        <div>
            <h2>{group.name}</h2>
            <p>{group.description}</p>
            <p>Category: {group.category}</p>
            <p>Members: {group.members_count}</p>
            {isMember ? (
                <p>You are a member of this group.</p>
            ) : (
                <Button onClick={handleJoin}>Join Group</Button>
            )}
        </div>
    );
}

export default GroupDetailPage;
