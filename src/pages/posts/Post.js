import React, { useEffect, useState } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import { Card, Col } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Row from "react-bootstrap/Row";

import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";

const Post = (props) => {
    const {
        id,
        owner,
        profile_id,
        profile_image,
        comments_count,
        likes_count,
        like_id,
        title,
        content,
        image,
        updated_at,
        postPage,
        setPosts,
        category,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const [categories, setCategories] = useState([]);
    const [categoryDetails, setCategoryDetails] = useState(null);

    useEffect(() => {
        // Fetch categories from the API
        axiosRes
            .get("https://8000-annanahit-drfapi-fa28dgkrr6c.ws.codeinstitute-ide.net/postcategories/")
            .then((response) => {
                setCategories(response.data.results);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error.response?.data);
                setCategories([]);
            });
    }, []);

    useEffect(() => {
        // Find and set the category details for the current post
        if (categories.length > 0) {
            const selectedCategory = categories.find((cat) => cat.id === category);
            setCategoryDetails(selectedCategory || null);
        }
    }, [categories, category]);

    const handleEdit = () => {
        history.push(`/posts/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/posts/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { post: id });
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) =>
                    post.id === id
                        ? { ...post, likes_count: post.likes_count + 1, like_id: data.id }
                        : post
                ),
            }));
        } catch (err) {
            console.error(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setPosts((prevPosts) => ({
                ...prevPosts,
                results: prevPosts.results.map((post) =>
                    post.id === id
                        ? { ...post, likes_count: post.likes_count - 1, like_id: null }
                        : post
                ),
            }));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card className={styles.Post}>
            <Card.Body>
                <Row className="align-items-center justify-content-between">
                    <Col xs="auto">
                        <Link to={`/profiles/${profile_id}`} className="d-flex flex-column align-items-start">
                            <div className="d-flex align-items-center">
                                <Avatar src={profile_image} height={55} />
                                <span className="ml-2">{owner}</span>
                            </div>
                            <small className="text-muted">{updated_at}</small>
                        </Link>
                    </Col>
                    <Col xs="auto">
                        <div className="d-flex align-items-center">
                            {is_owner && postPage && (
                                <MoreDropdown
                                    handleEdit={handleEdit}
                                    handleDelete={handleDelete}
                                />
                            )}
                        </div>
                    </Col>
                </Row>
                <span>
                    Category:{" "}
                    {categoryDetails ? (
                        <>
                            {categoryDetails.image && (
                                <img
                                    src={categoryDetails.image}
                                    alt={categoryDetails.name}
                                    height="20"
                                    className={styles.CategoryImage}
                                />
                            )}
                            {categoryDetails.name}
                        </>
                    ) : (
                        "None"
                    )}
                </span>
            </Card.Body>
            <Link to={`/posts/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {content && <Card.Text>{content}</Card.Text>}
                <div className={styles.PostBar}>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You can't like your own post!</Tooltip>}
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i className={`fas fa-heart ${styles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i className={`far fa-heart ${styles.HeartOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Log in to like posts!</Tooltip>}
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link to={`/posts/${id}`}>
                        <i className="far fa-comments" />
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Post;
