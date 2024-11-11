import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, ListGroup } from 'react-bootstrap';
import axios from 'axios';

const GroupDetailPage = () => {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const response = await axios.get(`/api/groups/${id}`);
                setGroup(response.data);
            } catch (err) {
                setError('Failed to fetch group details. Please try again.');
            }
        };

        fetchGroupDetails();
    }, [id]);

    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    if (!group) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{group.name}</h1>
            <Card>
                <Card.Body>
                    <Card.Title>Description</Card.Title>
                    <Card.Text>{group.description}</Card.Text>

                    <Card.Title>Category</Card.Title>
                    <Card.Text>{group.category?.name}</Card.Text>

                    <Card.Title>Members</Card.Title>
                    <ListGroup>
                        {group.members.map((member) => (
                            <ListGroup.Item key={member.id}>{member.username}</ListGroup.Item>
                        ))}
                    </ListGroup>

                    <Button variant="primary" onClick={() => console.log('Join Group functionality')}>
                        Join Group
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default GroupDetailPage;
