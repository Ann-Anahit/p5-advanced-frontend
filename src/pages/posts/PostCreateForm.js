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
    const [categories, setCategories] = useState([]);

    const [postData, setPostData] = useState({
        title: "",
        content: "",
        image: "",
        category: "",
        hashtags: "",
        inspiration: "",
    });

    const { title, content, image, category, hashtags, inspiration } = postData;
    const imageInput = useRef(null);
    const history = useHistory();

    useEffect(() => {
        axiosReq
            .get("/postcategories/")
            .then((response) => {
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
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };


    const handleCategoryChange = (selectedOption) => {
        setPostData((prevData) => ({
            ...prevData,
            category: selectedOption?.value || "",
        }));
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!title || !content || !category) {
            setErrors({
                ...errors,
                form: "Please fill in all required fields.",
            });
            return;
        }
        const formData = new FormData();

        formData.append("title", title);
        formData.append("content", content);
        formData.append("category", category);
        formData.append("hashtags", hashtags);
        formData.append("inspiration", inspiration);

        if (imageInput.current.files.length > 0) {
            formData.append("image", imageInput.current.files[0]);
        }

        try {
            const { data } = await axiosReq.post("/posts/", formData);
            history.push(`/posts/${data.id}`);
        } catch (err) {
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Row className={`justify-content-center ${styles.Row}`}>
            <Col className="my-auto py-2 p-md-2" sm={12}>
                <Form onSubmit={handleSubmit}>
                    <Container className={`${appStyles.Content} ${styles.Container}`}>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Select
                                options={categoryOptions}
                                onChange={handleCategoryChange}
                                className="react-select-container"
                                classNamePrefix="react-select"
                                placeholder="Select a category"
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
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                className={styles.Input}
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

                        <Form.Group>
                            <Form.Label>Hashtags</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="text"
                                name="hashtags"
                                value={hashtags}
                                placeholder="Enter hashtags, separated by commas"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors?.hashtags?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group>
                            <Form.Label>Inspiration</Form.Label>
                            <Form.Control
                                className={styles.Input}
                                type="text"
                                name="inspiration"
                                value={inspiration}
                                placeholder="Enter the source of inspiration"
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors?.inspiration?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                    <figure>
                                        <Image
                                            className={styles.PostImage}
                                            src={image}
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
                        {errors?.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <div className="text-center StackedButtons">
                            <Button
                                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                                onClick={() => history.push('/')}
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
                    </Container>
                </Form>
            </Col>
        </Row>
    );

}

export default PostCreateForm;
