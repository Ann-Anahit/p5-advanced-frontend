import React, { useState, useEffect } from 'react';
import { followHelper, unfollowHelper } from '../../utils/utils'; 
import { axiosReq } from '../../api/axiosDefaults';
import { useParams } from 'react-router-dom';

const GroupDetailPage = () => {
    const { id } = useParams();  // Extract group ID from URL
    const [group, setGroup] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        // Fetch the group details on page load
        const fetchGroupDetails = async () => {
            try {
                const { data } = await axiosReq.get(`/groups/${id}/`);
                setGroup(data);
                setIsFollowing(data.is_following);
            } catch (err) {
                console.error(err);
            }
        };

        fetchGroupDetails();
    }, [id]);

    const handleFollow = async () => {
        try {
            const response = await axiosReq.post(`/groups/${id}/follow/`);
            const updatedGroup = followHelper(group, response.data.group, response.data.following_id);
            setGroup(updatedGroup);
            setIsFollowing(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleUnfollow = async () => {
        try {
            const response = await axiosReq.post(`/groups/${id}/unfollow/`);
            const updatedGroup = unfollowHelper(group, response.data.group);
            setGroup(updatedGroup);
            setIsFollowing(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            {group ? (
                <div>
                    <h1>{group.name}</h1>
                    <p>{group.description}</p>
                    <button onClick={isFollowing ? handleUnfollow : handleFollow}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default GroupDetailPage;
