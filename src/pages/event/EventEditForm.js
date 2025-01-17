import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";

import styles from "../../styles/EventCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function EventEditForm() {
    useRedirect("loggedOut");
    const [errors, setErrors] = useState({});
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        event_image: "",
        event_start: "",
        duration: "",
        location: "",
    });
    const { title, description, event_image, event_start, duration, location } = eventData;

    const imageInput = useRef(null);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const { data } = await axiosReq.get(`/event/${id}`);
                setEventData(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchEventData();
    }, [id]);

    const handleChange = (event) => {
        setEventData({
            ...eventData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(event_image);
            setEventData({
                ...eventData,
                event_image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("event_image", imageInput.current.files[0]);
        formData.append("event_start", event_start);
        formData.append("duration", duration);
        formData.append("location", location);

        try {
            await axiosReq.put(`/event/${id}/`, formData);
            history.push(`/event/${id}?success=true`);
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row className="d-flex flex-column justify-content-center align-items-center">
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={title}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors?.title?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                name="description"
                                value={description}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors?.description?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group>
                            <Form.Label>Event Start</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                name="event_start"
                                value={event_start}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors?.event_start?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group>
                            <Form.Label>Event Duration</Form.Label>
                            <Form.Control
                                type="text"
                                name="duration"
                                value={duration}
                                onChange={handleChange}
                                placeholder="e.g., 2 hours, 3 days, 4 months"
                            />
                        </Form.Group>
                        {errors?.duration?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}


                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                value={location}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors?.location?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                    </Container>
                </Col>

                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            {event_image ? (
                                <>
                                    <figure>
                                        <Image
                                            className={styles.Image}
                                            src={event_image}
                                            rounded
                                        />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Color}`}
                                            htmlFor="image-upload"
                                        >
                                            Change the image
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="image-upload"
                                >
                                    <Asset
                                        src={Upload}
                                        message="Click or tap to upload an image"
                                    />
                                </Form.Label>
                            )}
                            <Form.Control
                                id="image-upload"
                                className="d-none"
                                type="file"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                        {errors?.event_image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                    </Container>
                </Col>

                <div className="text-center mt-3">
                    <Button
                        className={`${btnStyles.Button} ${btnStyles.Blue}`}
                        onClick={() => history.goBack()}
                    >
                        Cancel
                    </Button>
                    <Button
                        className={`${btnStyles.Button} ${btnStyles.Blue}`}
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </Row>
        </Form>
    );
}



export default EventEditForm;
