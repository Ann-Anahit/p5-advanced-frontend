import React, { useState } from "react";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { Button, Form, Alert } from "react-bootstrap";
import styles from "../../styles/GroupCreateEditForm.module.css"; 

function GroupCreateForm() {
    const [errors, setErrors] = useState({});
    const [groupData, setGroupData] = useState({
        name: "",
        description: "",
        category: "Art", // Example category; you can change it to your needs
    });
    const { name, description, category } = groupData;
    const history = useHistory();

    // Handle input changes
    const handleChange = (event) => {
        setGroupData({
            ...groupData,
            [event.target.name]: event.target.value,
        });
    };

    // Handle form submission to create a new group
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosReq.post("/api/groups/", groupData); // POST the group data to create a new group
            history.push(`/groups/${data.id}`); // Redirect to the newly created group
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data); // Display validation errors
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit} className={styles.Container}>
            <h1>Create a New Group</h1>

            {/* Group Name Input */}
            <Form.Group className={styles.FormGroup}>
                <Form.Label className={styles.FormLabel}>Group Name</Form.Label>
                <Form.Control
                    className={styles.FormControl}
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                />
                {errors?.name?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
            </Form.Group>

            {/* Group Description Input */}
            <Form.Group className={styles.FormGroup}>
                <Form.Label className={styles.FormLabel}>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    value={description}
                    onChange={handleChange}
                    required
                />
                {errors?.description?.map((message, idx) => (
                    <Alert variant="warning" key={idx}>
                        {message}
                    </Alert>
                ))}
            </Form.Group>

            {/* Category Input */}
            <Form.Group className={styles.FormGroup}>
                <Form.Label className={styles.FormLabel}>Category</Form.Label>
                <Form.Control
                    as="select"
                    name="category"
                    value={category}
                    onChange={handleChange}
                    className={styles.FormControl}
                >
                    <option value="Art">Art</option>
                    <option value="Music">Music</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Food">Food</option>
                    {/* Add more categories as needed */}
                </Form.Control>
            </Form.Group>

            {/* Submit Button */}
            <Button type="submit" className={styles.Button}>
                Create Group
            </Button>
        </Form>
    );
}

export default GroupCreateForm;
