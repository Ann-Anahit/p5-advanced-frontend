import React, { useState } from "react";
import { Button, Spinner, Card, OverlayTrigger, Tooltip, Row, Col } from "react-bootstrap";
import { axiosRes } from "../../api/axios";
import { useHistory } from "react-router-dom";
import styles from "../../styles/Group.module.css";
import Avatar from "../../components/Avatar";

const Group = ({ id, name, owner, description, image, category, updated_at, members_count, is_member, setGroups }) => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleMembership = async (action) => {
        setLoading(true);
        try {
            const url = `/groups/${id}/${action}`;
            await axiosRes.post(url);

            setGroups((prevGroups) => ({
                ...prevGroups,
                results: prevGroups.results.map((group) =>
                    group.id === id ? { ...group, is_member: action === "join", members_count: group.members_count + (action === "join" ? 1 : -1) } : group
                ),
            }));
        } catch (err) {
            console.error(`Failed to ${action} group`, err);
        } finally {
            setLoading(false);
        }
    };

    const isOwner = currentUser?.username === owner;

    return (
        <Card className={styles.Group}>
            <Card.Body>
                <Row className="align-items-center justify-content-between">
                    <Col xs="auto">
                        <Avatar src={image} height={55} />
                        <span className="ml-2">{owner}</span>
                    </Col>
                    <Col xs="auto">
                        <div className="d-flex align-items-center">
                            <span>{updated_at}</span>
                        </div>
                    </Col>
                </Row>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <div>Category: {category}</div>
                <div>
                    <span>{members_count} Members</span>
                    {!isOwner && (
                        <Button
                            onClick={() => handleMembership(is_member ? "leave" : "join")}
                            disabled={loading}
                            variant={is_member ? "outline-danger" : "outline-primary"}
                        >
                            {loading ? <Spinner animation="border" size="sm" /> : is_member ? "Leave Group" : "Join Group"}
                        </Button>
                    )}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Group;
