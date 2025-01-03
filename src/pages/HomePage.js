import React from "react";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.headline}>Meet&Mingle</h1>
            <h2 className={styles.subtitle}>Connect, Discover and Enjoy</h2>
            <p className={styles.paragraph}>
                Welcome to <span className={styles.highlight}>Meet&Mingle</span>, the social platform designed to connect and inspire. Share your posts, achievements, and experiences with others, and discover events, activities, and communities that match your interests, hobbies, or professional goals. Whether through in-person meetups or virtual gatherings, join us today and build meaningful connections while celebrating your journey with the world.
            </p>
            <p className={styles.paragraph}>
                <span className={styles.highlight}>Start mingling. Let’s make meaningful connections together!</span>
            </p>
        </div>
    );
};

export default HomePage;
