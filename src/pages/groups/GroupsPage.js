import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Card, Button, Form, Alert, Spinner } from "react-bootstrap";
import styles from "../../styles/GroupsPage.module.css";
import buttonStyles from "../../styles/Button.module.css";

function GroupsPage() {
    const [groups, setGroups] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [groupData, setGroupData] = useState({
        name: "",
        description: "",
        category: "Art", // Category name
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [isLoadingGroups, setIsLoadingGroups] = useState(true);

    const getLoggedInUserId = () => {
        return 1; // Example: Replace with actual user ID
    };

    const categoryMapping = {
        Art: 1,
        Music: 2,
        Comedy: 3,
        Food: 4,
    };

    // Fetch groups data
    useEffect(() => {
        const fetchGroups = async () => {
            console.log("Fetching groups...");
            try {
                const { data } = await axiosReq.get("/groups/");
                console.log("Groups fetched successfully:", data);
                setGroups(data.results);
            } catch (err) {
                console.error("Error fetching groups:", err);
            } finally {
                setIsLoadingGroups(false);
            }
        };
        fetchGroups();
    }, []);

    const toggleForm = () => {
        setShowForm(!showForm);
        setErrors({});
        setGroupData({ name: "", description: "", category: "Art" });
    };

    const handleChange = (event) => {
        setGroupData({
            ...groupData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const categoryPk = categoryMapping[groupData.category]; // Convert category to pk value
        const creatorId = getLoggedInUserId(); // Get the logged-in user's ID
        const participants = [creatorId]; // Initially, participants will be just the creator

        const groupToCreate = {
            name: groupData.name,
            description: groupData.description,
            category: categoryPk, // Corrected variable name
            creator: creatorId,
            participants: participants,
        };

        try {
            const { data } = await axiosReq.post("/groups/", groupToCreate);
            console.log("Group created successfully:", data);
            setGroups((prevGroups) => [data, ...prevGroups]);
            toggleForm();
        } catch (err) {
            console.error("Error creating group:", err.response?.data || err);
            setErrors(err.response?.data || { general: ["An error occurred. Please try again."] });
        } finally {
            setLoading(false);
            console.log("Form submission complete.");
        }
    };

    return (
        <div className={styles.GroupsContainer}>
            <Button variant="success" onClick={toggleForm} className={buttonStyles.CreateButton}>
                {showForm ? "Close Form" : "Create Group"}
            </Button>

            {showForm && (
                <Form onSubmit={handleSubmit} className={styles.CreateGroupForm}>
                    <h3>Create a New Group</h3>
                    {errors.general && <Alert variant="danger">{errors.general}</Alert>}
                    <Form.Group>
                        <Form.Label>Group Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={groupData.name}
                            onChange={handleChange}
                            required
                        />
                        {errors.name?.map((msg, idx) => (
                            <Alert key={idx} variant="warning">{msg}</Alert>
                        ))}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={groupData.description}
                            onChange={handleChange}
                            required
                        />
                        {errors.description?.map((msg, idx) => (
                            <Alert key={idx} variant="warning">{msg}</Alert>
                        ))}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            name="category"
                            value={groupData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="Art">Art</option>
                            <option value="Music">Music</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Food">Food</option>
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit" variant="primary" disabled={loading}>
                        {loading ? <Spinner as="span" animation="border" size="sm" /> : "Create Group"}
                    </Button>
                </Form>
            )}

            {isLoadingGroups ? (
                <div className={styles.LoadingContainer}>
                    <Spinner animation="border" variant="primary" />
                    <p>Loading groups...</p>
                </div>
            ) : groups.length > 0 ? (
                <div className={styles.GroupList}>
                    {groups.map((group) => (
                        <Card key={group.id} className={styles.GroupCard}>
                            <Card.Body>
                                <Card.Title>{group.name}</Card.Title>
                                <Card.Text>{group.description}</Card.Text>
                                <div><strong>Category:</strong> {group.category?.name}</div>
                                <div>
                                    <strong>Members:</strong>{" "}
                                    {group.members_count > 0 ? group.members_count : "No members yet"}
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className={styles.NoGroupsMessage}>
                    <p>No groups available. Create one to get started!</p>
                </div>
            )}
        </div>
    );
}

export default GroupsPage;
