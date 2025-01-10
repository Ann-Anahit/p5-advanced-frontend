import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "../styles/Categories.module.css";

function Categories({ categories }) {
    return (
        <div className={styles.categories}>
            {categories.map((category) => (
                <div key={category.id} className={styles.category}>
                    {category.icon ? (
                        <FontAwesomeIcon icon={category.icon} className={styles.categoryIcon} />
                    ) : (
                        <FontAwesomeIcon icon="circle" className={styles.categoryIcon} />
                    )}
                    <span>{category.name}</span>
                </div>
            ))}
        </div>
    );
}

export default Categories;
