import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card, Button, Row, Col, OverlayTrigger, Tooltip, Spinner } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Group.module.css";

const Group = (props) => {
    const { id, name, owner, description, image, category, updated_at, members_count, is_member, setGroups } = props;
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const navigate = useHistory();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!currentUser) {
            navigate("/signin"); // Redirect to signin if no user is found
        }
    }, [currentUser, navigate]);

    const handleGroupMembership = async (action) => {
        if (!currentUser) {
            alert("Please sign in to join the group.");
            navigate("/signin");
            return;
        }

        setLoading(true);
        try {
            const url = `/groups/${id}/${action}/`;
            await axiosRes.post(url);

            setGroups((prevGroups) => ({
                ...prevGroups,
                results: prevGroups.results.map((group) =>
                    group.id === id
                        ? {
                            ...group,
                            members_count: action === "join" ? group.members_count + 1 : group.members_count - 1,
                            is_member: action === "join",
                        }
                        : group
                ),
            }));
        } catch (err) {
            console.error(`Error with ${action}ing group:`, err);
            alert(`Failed to ${action} the group.`);
        } finally {
            setLoading(false);
        }
    };

    const handleEditGroup = () => {
        if (!is_owner) {
            alert("You are not the owner of this group.");
            return;
        }
        navigate(`/groups/${id}/edit`);
    };

    const handleDeleteGroup = async () => {
        if (!is_owner) {
            alert("You are not the owner of this group.");
            return;
        }

        try {
            await axiosRes.delete(`/groups/${id}/`);
            navigate(-1); // Go back to the previous page
        } catch (err) {
            console.error("Error deleting group:", err);
            alert("Failed to delete the group.");
        }
    };

    return (
        <Card className={styles.Group}>
            <Card.Body>
                <Row className="align-items-center justify-content-between">
                    <Col xs="auto">
                        <Link to={`/profiles/${owner}`} className="d-flex align-items-center">
                            <Avatar src={image} height={55} />
                            <span className="ml-2">{owner}</span>
                        </Link>
                    </Col>
                    <Col xs="auto">
                        <div className="d-flex align-items-center">
                            <span>{updated_at}</span>
                            {is_owner && (
                                <MoreDropdown
                                    handleEdit={handleEditGroup}
                                    handleDelete={handleDeleteGroup}
                                />
                            )}
                        </div>
                    </Col>
                </Row>
            </Card.Body>
            <Card.Img src={image} alt={name} />
            <Card.Body>
                <Card.Title className="text-center">{name}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <div className={styles.GroupCategory}>Category: {category}</div>
                <div className={styles.GroupBar}>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You can't join your own group!</Tooltip>}
                        >
                            <Button variant="outline-primary" disabled>
                                Join Group
                            </Button>
                        </OverlayTrigger>
                    ) : is_member ? (
                        <Button
                            variant="outline-danger"
                            onClick={() => handleGroupMembership("leave")}
                            disabled={loading}
                        >
                            {loading ? <Spinner as="span" animation="border" size="sm" /> : "Leave Group"}
                        </Button>
                    ) : (
                        <Button
                            variant="outline-primary"
                            onClick={() => handleGroupMembership("join")}
                            disabled={loading}
                        >
                            {loading ? <Spinner as="span" animation="border" size="sm" /> : "Join Group"}
                        </Button>
                    )}
                    <span>{members_count} Members</span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Group;
