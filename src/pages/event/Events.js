import React, { useState } from "react";
import styles from "../../styles/Events.module.css";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Button, Modal } from "react-bootstrap";

const Events = (props) => {
    const {
        id,
        owner,
        profile_id,
        title,
        description,
        event_image,
        event_start,
        duration,
        location,
        eventPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);

    const handleEdit = () => {
        history.push(`/event/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/event/${id}/`);
            setShowModal(false);
            history.goBack();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Card className={`${styles.Event} mb-4`}>
                <Card.Body className="d-flex flex-row align-items-start">
                    <div className="text-center">
                        <Link to={`/event/${id}`}>
                            <Card.Img
                                src={event_image}
                                alt={title}
                                className={`${styles.EventImage} mb-3`}
                            />
                        </Link>
                        <div className="mb-3">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <i className="fa-solid fa-calendar-days me-2" />
                                <span>{event_start}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <i className="fa-solid fa-clock me-2" />
                                <span>{duration ? `${duration} hours` : "Duration not available"}</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <i className="fa-solid fa-map-marker-alt me-2" />
                                <span>{location ? location : "Location not available"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-grow-1">
                        <Link to={`/event/${id}`} className="text-decoration-none">
                            {title && <Card.Title className="text-start">{title}</Card.Title>}
                        </Link>
                        {description && (
                            <Card.Text className="text-start mt-2">{description}</Card.Text>
                        )}

                        <div className="mt-3">
                            <div className="d-flex align-items-center mb-2">
                                <span>Hosted by </span>
                                <Link
                                    to={`/profiles/${profile_id}`}
                                    className="ms-2 text-decoration-none"
                                >
                                    <strong>{owner}</strong>
                                </Link>
                            </div>
                        </div>

                    </div>

                    {is_owner && eventPage && (
                        <MoreDropdown
                            handleEdit={handleEdit}
                            handleDelete={() => setShowModal(true)}
                        />
                    )}
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this event? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Events;
