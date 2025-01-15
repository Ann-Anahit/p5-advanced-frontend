import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { useParams, useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Event from "./Event";
import { Alert } from "react-bootstrap";

function EventPage() {
    const { id } = useParams();
    const location = useLocation();
    const [event, setEvent] = useState({ results: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: event }] = await Promise.all([
                    axiosReq.get(`/events/${id}`),
                ]);
                setEvent({ results: [event] });
                setLoading(false);  // Set loading to false after data is fetched
            } catch (err) {
                console.error(err); // Handle error as needed
            }
        };

        handleMount();
    }, [id]);

    const queryParams = new URLSearchParams(location.search);
    const success = queryParams.get("success");

    return (
        <Container fluid>
            <Row className="h-100">
                <Col className="py-2 p-0 p-lg-2" lg={8} xs={12}>
                    {loading ? (
                        <div>Loading...</div> // Show a loading indicator
                    ) : (
                        <>
                            {success === "true" && (
                                <Alert variant="success" className="text-center mb-4">
                                    Event updated successfully!
                                </Alert>
                            )}
                            {event.results[0] ? (
                                <Event {...event.results[0]} setEvents={setEvent} eventPage />
                            ) : (
                                <div>No event found</div>
                            )}
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default EventPage;
