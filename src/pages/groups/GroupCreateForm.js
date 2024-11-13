import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/GroupCreateEditForm.module.css";

function GroupCreateForm() {
    const [groupData, setGroupData] = useState({
        name: "",
        description: "",
        category: "Art", // Default category
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    // Define the category mapping here
    const categoryMapping = {
        Art: 1,
        Music: 2,
        Comedy: 3,
        Food: 4,
    };

    // Implement a mock function to get the logged-in user's ID (this should be replaced with actual logic)
    const getLoggedInUserId = () => {
        return 1; // Replace with actual logic to get the logged-in user's ID, e.g., from localStorage or an API call
    };

    // Handle form input changes
    const handleChange = (event) => {
        setGroupData({
            ...groupData,
            [event.target.name]: event.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        // Convert category to the corresponding pk value
        const categoryPk = categoryMapping[groupData.category];
        const creatorId = getLoggedInUserId(); // Get the logged-in user's ID
        const participants = [creatorId]; // Initially, participants will be just the creator

        const groupToCreate = {
            name: groupData.name,
            description: groupData.description,
            category: categoryPk, // Corrected variable name
            creator: creatorId,
            participants: participants, // Ensure this is in the correct format
        };

        try {
            // Send the POST request to create a new group
            const { data } = await axiosReq.post("/groups/", groupToCreate);
            console.log("Group created successfully:", data);

            // Redirect to the new group's detail page after creation
            history.push(`/groups/${data.id}`);
        } catch (err) {
            console.error("Error creating group:", err.response?.data || err);
            // Handle errors (make sure the backend sends the error message in the expected format)
            setErrors(err.response?.data || { general: ["An error occurred. Please try again."] });
        } finally {
            setLoading(false);
            console.log("Form submission complete.");
        }
    };

    return (
        <Form onSubmit={handleSubmit} className={styles.Container}>
            <h1>Create a New Group</h1>
            {errors.general && (
                <Alert variant="danger">
                    {errors.general.map((msg, idx) => <div key={idx}>{msg}</div>)}
                </Alert>
            )}
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
                    <Alert variant="warning" key={idx}>{msg}</Alert>
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
                    <Alert variant="warning" key={idx}>{msg}</Alert>
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
            <Button type="submit" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Create Group"}
            </Button>
        </Form>
    );
}

export default GroupCreateForm;
