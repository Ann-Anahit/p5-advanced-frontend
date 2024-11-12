import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form, Alert, Spinner } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import styles from "../../styles/GroupCreateEditForm.module.css";

function GroupCreateForm() {
    const [groupData, setGroupData] = useState({
        name: "",
        description: "",
        category: "Art",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const history = useHistory();

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
            const { data } = await axiosReq.post("/groups/", groupData);
            // Redirect to the new group’s detail page
            history.push(`/groups/${data.id}`);
        } catch (err) {
            setErrors(err.response?.data || { general: ["An error occurred. Please try again."] });
        } finally {
            setLoading(false);
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
