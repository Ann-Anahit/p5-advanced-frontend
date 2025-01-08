import React, { useEffect, useState } from "react";
import { axiosRes } from "../api/axiosDefaults";
import Post from "../pages/posts/Post";
import styles from "../styles/HomePage.module.css";
import btnStyles from "../styles/Button.module.css";


const shufflePosts = (posts) => {
    for (let i = posts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [posts[i], posts[j]] = [posts[j], posts[i]];
    }
    return posts;
};

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 3;

    const fetchPosts = async () => {
        try {
            const response = await axiosRes.get("/posts/");
            const shuffledPosts = shufflePosts(response.data.results);
            setPosts(shuffledPosts);
            setTotalPages(Math.ceil(shuffledPosts.length / postsPerPage));
        } catch (err) {
            console.error("Error fetching posts:", err);
        }
    };


    useEffect(() => {
        fetchPosts();
    }, []);


    const currentPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className={styles.container}>
            {/* Text Content */}
            <h1 className={styles.headline}>Meet&Mingle</h1>
            <h2 className={styles.subtitle}>Connect, Discover and Enjoy</h2>
            <p className={styles.paragraph}>
                Welcome to <span className={styles.highlight}>Meet&Mingle</span>, the social platform designed to connect and inspire. Share your posts, achievements, and experiences with others, and discover events, activities, and communities that match your interests, hobbies, or professional goals. Whether through in-person meetups or virtual gatherings, join us today and build meaningful connections while celebrating your journey with the world.
            </p>

            {/* Post List */}
            <div className={styles.postsContainer}>
                {currentPosts.map((post) => (
                    <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className={styles.pagination}>
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`${btnStyles.Button} ${btnStyles.Black}`}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`${btnStyles.Button} ${btnStyles.Black}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default HomePage;
