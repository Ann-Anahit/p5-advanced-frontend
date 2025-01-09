import React from "react";
import styles from "../styles/Avatar.module.css";

const defaultAvatar = "https://res.cloudinary.com/ddbihgvkh/image/upload/v1736421108/default_profile_f6vj23.jpg";

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