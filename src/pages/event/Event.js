import React, { useState } from "react";
import styles from "../../styles/Event.module.css";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
    Card,
    Media,
    Button,
    Modal,
} from "react-bootstrap";

const Event = (props) => {
    const {
        id,
        owner,
        profile_id,
        title,
        description,
        event_image,
        event_start,
        event_duration,
        event_location,
        eventPage,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);

    const handleEdit = () => {
        history.push(`/events/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/events/${id}/`);
            history.goBack();
        } catch (err) { }
        setShowModal(false);
    };

    return (
        <>
            <Card className={styles.Event}>
                <Card.Body>
                    <Media className="d-flex align-items-center justify-content-between">
                        <Link
                            to={`/events/${id}`}
                            className="d-flex flex-grow-1 justify-content-center pt-3"
                        >
                            {title && (
                                <Card.Title className="text-center">{title}</Card.Title>
                            )}
                        </Link>
                        <div className="mt-3 p-3 text-center">
                            {description && <Card.Text>{description}</Card.Text>}
                        </div>
                        {is_owner && eventPage && (
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDelete={() => setShowModal(true)}
                            />
                        )}
                    </Media>
                </Card.Body>
                <Link to={`/events/${id}`}>
                    <Card.Img src={event_image} alt={title} />
                </Link>
                <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            Hosted by{" "}
                            <Link
                                to={`/profiles/${profile_id}`}
                                className="d-flex align-items-center ms-2"
                            >
                                {owner}
                            </Link>
                        </div>
                        <div className="d-flex align-items-center">
                            <i className="fa-solid fa-calendar-days fa-xl" />
                            <span>{event_start}</span>
                            <i className="fa-solid fa-clock fa-xl ml-3" />
                            <span>{event_duration ? `${event_duration} hours` : "Duration not available"}</span>
                            <i className="fa-solid fa-users fa-xl ml-3" />
                        </div>

                    </div>
                    <div className="d-flex align-items-center mt-2">
                        <i className="fa-solid fa-map-marker-alt fa-xl" />
                        <span>{event_location ? event_location : "Location not available"}</span>
                    </div>
                </Card.Body>
            </Card >

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this event? This action cannot be
                    undone.
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

export default Event;
