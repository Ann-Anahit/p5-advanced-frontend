import React, { useEffect, useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { Card, Button, Form, Alert, Spinner } from "react-bootstrap";
import styles from "../../styles/GroupsPage.module.css";

function GroupsPage() {
    const [groups, setGroups] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [groupData, setGroupData] = useState({
        name: "",
        description: "",
        category: "Art",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Fetch groups data
    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const { data } = await axiosReq.get("/groups/");
                setGroups(data.results);
            } catch (err) {
                console.error(err);
            }
        };
        fetchGroups();
    }, []);

    // Toggle form visibility
    const toggleForm = () => {
        setShowForm(!showForm);
        setErrors({});
        setGroupData({ name: "", description: "", category: "Art" });
    };

    // Handle form changes
    const handleChange = (event) => {
        setGroupData({
            ...groupData,
            [event.target.name]: event.target.value,
        });
    };

    // Handle form submission for creating a new group
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const { data } = await axiosReq.post("/groups/", groupData);
            setGroups((prevGroups) => [data, ...prevGroups]);
            toggleForm(); // Hide the form on successful submission
        } catch (err) {
            setErrors(err.response?.data || { general: ["An error occurred. Please try again."] });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.GroupsContainer}>
            <Button variant="success" onClick={toggleForm} className={styles.CreateButton}>
                {showForm ? "Close Form" : "Create Group"}
            </Button>

            {/* Group Creation Form */}
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

            {/* Display List of Groups */}
            <div className={styles.GroupList}>
                {groups.map((group) => (
                    <Card key={group.id} className={styles.GroupCard}>
                        <Card.Body>
                            <Card.Title>{group.name}</Card.Title>
                            <Card.Text>{group.description}</Card.Text>
                            <div>Category: {group.category}</div>
                            <div>Members: {group.members_count}</div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default GroupsPage;
