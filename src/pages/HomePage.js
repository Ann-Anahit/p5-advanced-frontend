import React from "react";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.logo}>Meet&Mingle</h1>
            <h2 className={styles.subtitle}>Connect, Discover and Enjoy</h2>
            <p className={styles.paragraph}>
                Welcome to <span className={styles.highlight}>Meet&Mingle</span>, the social platform crafted to bring people together, whether through in-person meetups or virtual gatherings. Discover events, activities, and communities that align with your interests, hobbies, or professional passions. Join us today and embark on a journey filled with memorable experiences and lasting friendships.
            </p>
            <p className={styles.paragraph}>
                <span className={styles.highlight}>Start mingling. Let’s make meaningful connections together!</span>
            </p>
        </div>
    );
};

export default HomePage;
