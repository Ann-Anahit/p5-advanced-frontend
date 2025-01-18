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
    const [posts, setPosts] = useState({ results: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const postsPerPage = 3;

    const fetchPosts = async () => {
        try {
            const response = await axiosRes.get("/posts/");
            const postArray = response.data.results || response.data;

            if (Array.isArray(postArray)) {
                const shuffledPosts = shufflePosts([...postArray]); // Shuffle posts
                setPosts({ results: shuffledPosts });
                setTotalPages(Math.ceil(shuffledPosts.length / postsPerPage));
            } else {
                console.error("Unexpected API response format:", response.data);
            }
        } catch (err) {
            console.error("Error fetching posts:", err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const currentPosts = posts.results
        ? posts.results.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
        : [];

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
            <div className={styles.paragraph}>
                Welcome to <span className={styles.highlight}>Meet&Mingle</span>, your vibrant space to connect, share, and engage with a community of like-minded individuals. Whether you're passionate about Lifestyle, Music, Art, Food, or Business, our platform provides a space where creativity thrives and connections grow.
                <h3>Create Your Account</h3>
                <p>Sign up and create your personal profile to start posting and sharing your experiences. With tailored categories based on your interests, your content will be seen by a community that genuinely appreciates it. Additionally, you have the opportunity to share and create events.</p>
                <h3>Create, Edit, and Manage Your Content</h3>
                <p>Meet&Mingle allows you to take control of your posts and events. Whether it’s sharing your thoughts, showcasing your work, or organizing an event, you have the power to manage and customize your content. From creating new events to editing your existing ones, everything is at your fingertips.</p>
                <h3>Categories for Every Passion</h3>
                <strong>Lifestyle:</strong> Share your personal journey, daily experiences, and tips for a fulfilling lifestyle.
                <strong>Music:</strong> Post about your favorite songs, upcoming gigs, or music-related discussions.
                <strong>Art:</strong> Showcase your artwork, express creativity, and engage in art-focused conversations.
                <strong>Food:</strong> Share recipes, food photography, dining experiences, and foodie adventures.
                <strong>Business:</strong> Connect with entrepreneurs, discuss trends, and share business insights.
            </div>

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
