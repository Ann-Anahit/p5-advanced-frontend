import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/GroupManagement.module.css';

const GroupManagement = () => {
    // State to hold the list of groups, new group form, and selected group
    const [groups, setGroups] = useState([]);
    const [newGroup, setNewGroup] = useState({
        name: '',
        description: '',
        category: 'Art',
    });
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    // Fetch groups from the API when the component mounts
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get('/api/groups/');
                setGroups(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchGroups();
    }, []);

    // Handle form input changes for creating a new group
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewGroup((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle group creation
    const handleCreateGroup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/groups/', newGroup);
            setGroups((prevState) => [...prevState, response.data]);
            setNewGroup({ name: '', description: '', category: 'Art' });
        } catch (err) {
            console.error(err);
        }
    };

    // Handle joining a group
    const handleJoinGroup = async (groupId) => {
        try {
            const response = await axios.post(`/api/groups/${groupId}/join/`);
            setGroups((prevState) =>
                prevState.map((group) =>
                    group.id === groupId
                        ? { ...group, members: [...group.members, response.data] }
                        : group
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    // Handle leaving a group
    const handleLeaveGroup = async (groupId) => {
        try {
            const response = await axios.post(`/api/groups/${groupId}/leave/`);
            setGroups((prevState) =>
                prevState.map((group) =>
                    group.id === groupId
                        ? { ...group, members: group.members.filter((m) => m.id !== response.data.id) }
                        : group
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="group-management">
            <h1>Group Management</h1>

            {/* New Group Form */}
            <h2>Create Group</h2>
            <form onSubmit={handleCreateGroup}>
                <div>
                    <label htmlFor="name">Group Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newGroup.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={newGroup.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        name="category"
                        value={newGroup.category}
                        onChange={handleInputChange}
                    >
                        <option value="Art">Art</option>
                        <option value="Music">Music</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Movie Theater">Movie Theater</option>
                        <option value="Food">Food</option>
                    </select>
                </div>
                <button type="submit">Create Group</button>
            </form>

            {/* Group List */}
            <h2>All Groups</h2>
            <ul>
                {groups.map((group) => (
                    <li key={group.id}>
                        <h3>{group.name}</h3>
                        <p>{group.description}</p>
                        <p>Category: {group.category.name}</p>
                        <p>Members: {group.members.length}</p>
                        <button onClick={() => setSelectedGroupId(group.id)}>
                            View Details
                        </button>
                        <button onClick={() => handleJoinGroup(group.id)}>
                            Join Group
                        </button>
                        <button onClick={() => handleLeaveGroup(group.id)}>
                            Leave Group
                        </button>
                    </li>
                ))}
            </ul>

            {/* Group Details */}
            {selectedGroupId && (
                <div className="group-details">
                    <h3>Group Details</h3>
                    <p>
                        Group ID: {selectedGroupId}
                    </p>
                    <button onClick={() => setSelectedGroupId(null)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default GroupManagement;
