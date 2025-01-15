import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Upload from "../../assets/upload.png";
import styles from "../../styles/EventCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Alert, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function EventCreateForm() {
    useRedirect('loggedOut');
    const [errors, setErrors] = useState({});
    const [postData, setPostData] = useState({
        title: "",
        description: "",
        event_image: "",
        event_start: "",
        event_duration: "",
        event_location: "",
    });
    const { title, description, event_image, event_start, event_duration, event_location } = postData;
    const imageInput = useRef(null);
    const history = useHistory();

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(event_image);
            setPostData({
                ...postData,
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
        formData.append("event_duration", event_duration);
        formData.append("event_location", event_location);

        try {
            const { data } = await axiosReq.post("/event/", formData);
            history.push(`/event/${data.id}`);
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Row className={`justify-content-center ${styles.Row}`}>
            <Col className="my-auto py-2 p-md-2" sm={12}>
                <h1 className={styles.Header}>Create an Event</h1>
                <Form onSubmit={handleSubmit}>
                    <Container className={`${appStyles.Content} ${styles.Container}`}>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                className={styles.Input}
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
                                className={styles.Input}
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
                                className={styles.Input}
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
                                className={styles.Input}
                                type="text"
                                name="event_duration"
                                value={event_duration}
                                onChange={handleChange}
                                placeholder="e.g., 2 hours, 3 days, 4 months"
                            />
                        </Form.Group>
                        {errors?.event_duration?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="text"
                                name="event_location"
                                value={event_location}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors?.event_location?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group className="text-center">
                            {event_image ? (
                                <>
                                    <figure>
                                        <Image
                                            className={appStyles.Image}
                                            src={event_image}
                                            rounded
                                        />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Button}`}
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

                        <Button
                            className={`${btnStyles.Button} ${btnStyles.margin}`}
                            onClick={() => history.push('/')}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Button}`}
                            type="submit"
                        >
                            Create
                        </Button>
                    </Container>
                </Form>
            </Col>
        </Row>
    );
}

export default EventCreateForm;
