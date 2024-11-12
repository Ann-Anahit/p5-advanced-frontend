import React, { useState, useEffect } from 'react';
import { fetchMoreData, followHelper } from '../../utils/utils';  // Corrected path
import { axiosReq } from '../../api/axiosDefaults';  // Correct path

const GroupManagement = () => {
    const [groups, setGroups] = useState({
        results: [],
        next: null,
    });

    const handleFollow = (groupId, following_id) => {
        const currentGroup = groups.results.find(group => group.id === groupId);
        if (currentGroup) {
            const updatedGroup = followHelper(currentGroup, groupId, following_id);
            setGroups((prevState) => ({
                ...prevState,
                results: prevState.results.map(group =>
                    group.id === groupId ? updatedGroup : group
                ),
            }));
        }
    };
    const loadMoreGroups = () => {
        fetchMoreData(groups, setGroups);
    };

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const { data } = await axiosReq.get('/groups/');
                setGroups({
                    results: data.results,
                    next: data.next,
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchGroups();
    }, []);

    return (
        <div>
            {groups.results.map(group => (
                <div key={group.id}>
                    <h3>{group.name}</h3>
                    <button onClick={() => handleFollow(group.id, group.following_id)}>
                        Follow
                    </button>
                </div>
            ))}
            {groups.next && <button onClick={loadMoreGroups}>Load More</button>}
        </div>
    );
};

export default GroupManagement;
