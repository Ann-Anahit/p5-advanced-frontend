import React from "react";
import styles from "../styles/Avatar.module.css";

const defaultAvatar = "https://res.cloudinary.com/ddbihgvkh/image/upload/v1731019372/vecteezy_default-profile_uoif6j.jpg";

const Avatar = ({ src, height = 45, text }) => {
    return (
        <span>
            <img
                className={styles.Avatar}
                src={src || defaultAvatar}
                height={height}
                width={height}
                alt="avatar"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultAvatar;
                }}
            />
            {text}
        </span>
    );
};

export default Avatar;