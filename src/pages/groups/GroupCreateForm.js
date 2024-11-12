// GroupCreateForm.js  
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import axios from "../../api/axiosDefaults";
import styles from "../../styles/GroupCreateEditForm.module.css";
import { getAuthToken } from '../../utils/utils';

const api = axios.create({
    // Your API configuration  
});

function GroupCreateForm() {
    const [errors, setErrors] = useState({});
    const [groupData, setGroupData] = useState({
        name: "",
        description: "",
        category: "Art",
    });
    const { name, description, category } = groupData;
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Optional: You can check if the user is logged in by checking the token on mount
        const token = getAuthToken();
        if (!token) {
            // Redirect to login if no token is present
            history.push("/signin");
        }
    }, [history]);

    const handleChange = (event) => {
        setGroupData({
            ...groupData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const token = getAuthToken();
            if (token) {
                const response = await api.post(
                    "/api/groups/",
                    groupData,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`, // Ensure token is sent in the header  
                        },
                        withCredentials: true, // If using cookies  
                    }
                );
                history.push(`/groups/${response.data.id}`); // Redirect to the group details page  
            } else {
                // If no token, handle unauthorized error  
                setErrors({ ...errors, auth: ["Unauthorized. Please log in again."] });
                history.push("/signin");
            }
        } catch (err) {
            // The error handling logic remains the same  
            if (err.response) {
                if (err.response.status === 401) {
                    setErrors({ ...errors, auth: ["Session expired. Please log in again."] });
                } else {
                    setErrors(err.response.data);
                }
            } else {
                setErrors({ ...errors, general: ["An unknown error occurred. Please try again."] });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className={styles.Container}>
            <h1>Create a New Group</h1>
            {errors.auth && (
                <Alert variant="danger">
                    {errors.auth.map((msg, idx) => (
                        <div key={idx}>{msg}</div>
                    ))}
                </Alert>
            )}
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
                </Form.Control>
            </Form.Group>
            <Button type="submit" className={styles.Button} disabled={loading}>
                {loading ? <Spinner as="span" animation="border" size="sm" /> : "Create Group"}
            </Button>
        </Form>
    );
}

export default GroupCreateForm;
