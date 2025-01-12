import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import Select from "react-select";

import Asset from "../../components/Asset";
import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function PostCreateForm() {
    useRedirect("loggedOut");
    const [errors, setErrors] = useState({});
    const [wordCount, setWordCount] = useState(0);
    const [categories, setCategories] = useState([]);

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
        category: "",
    });

    const { title, content, image, category } = postData;
    const imageInput = useRef(null);
    const history = useHistory();

    useEffect(() => {
        axiosReq
            .get("https://8000-annanahit-drfapi-fa28dgkrr6c.ws.codeinstitute-ide.net/postcategories/")
            .then((response) => {
                console.log("Fetched categories:", response.data.results); // Log category data
                setCategories(response.data.results);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error.response?.data);
                setCategories([]);
            });
    }, []);

    const categoryOptions = categories.map((cat) => ({
        value: cat.id,
        label: (
            <div className="d-flex align-items-center">
                {cat.image && (
                    <img
                        src={cat.image}
                        alt={cat.name}
                        style={{ width: "20px", height: "20px", marginRight: "8px" }}
                    />
                )}
                {cat.name}
            </div>
        ),
    }));

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(`Field changed: ${name}, Value: ${value}`); // Log field changes
        setPostData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (name === "content") {
            const words = value.trim().split(/\s+/);
            if (words.length > 50) {
                setErrors((prev) => ({
                    ...prev,
                    content: ["Content cannot exceed 50 words."],
                }));
            } else {
                setErrors((prev) => ({ ...prev, content: null }));
            }
            setWordCount(words.length);
        }
    };

    const handleCategoryChange = (selectedOption) => {
        console.log("Selected category:", selectedOption?.value); // Log selected category
        setPostData((prevData) => ({
            ...prevData,
            category: selectedOption?.value || "",
        }));
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            console.log("Selected image:", event.target.files[0]); // Log selected image
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Submitting form data:", { title, content, category, image }); // Log form data
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", category);

        if (imageInput.current.files.length > 0) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            const { data } = await axiosReq.post("/posts/", formData);
            console.log("Post created successfully:", data); // Log success response
            history.push(`/posts/${data.id}`);
        } catch (err) {
            console.error("Error creating post:", err.response?.data); // Log error response
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
                            <Form.Label>Category</Form.Label>
                            <Select
                                options={categoryOptions}
                                onChange={handleCategoryChange}
                                className="react-select-container"
                                classNamePrefix="react-select"
                            />
                        </Form.Group>
                        {errors?.category?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

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
                            <Form.Label>Content (Word Count: {wordCount}/50)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={6}
                                name="content"
                                value={content}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors?.content?.map((message, idx) => (
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
                            {image ? (
                                <>
                                    <figure>
                                        <Image className={styles.PostImage} src={image} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
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
                                    <Asset src={Upload} message="Click or tap to upload an image" />
                                </Form.Label>
                            )}

                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                                className={styles.HiddenFileInput}
                            />
                        </Form.Group>
                        {errors?.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                    </Container>
                </Col>
                <div className="text-center StackedButtons">
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
                        Create
                    </Button>
                </div>
            </Row>
        </Form>
    );
}

export default PostCreateForm;
