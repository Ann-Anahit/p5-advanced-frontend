import React from "react";
import { Card, Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const Message = ({ id, sender, receiver, content, created_at, messagePage, setMessages }) => {
    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === sender;

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/messages/${id}/`);
            setMessages(prevMessages => ({
                ...prevMessages,
                results: prevMessages.results.filter(message => message.id !== id),
            }));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card>
            <Card.Body>
                <Row className="align-items-center justify-content-between">
                    <Col xs="auto">
                        <span>{sender}</span>
                    </Col>
                    <Col xs="auto">
                        <div className="d-flex align-items-center">
                            <span>{created_at}</span>
                            {is_owner && messagePage && (
                                <MoreDropdown handleDelete={handleDelete} />
                            )}
                        </div>
                    </Col>
                </Row>
                <Card.Text>{content}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Message;
