import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Categories({ categories }) {
    return (
        <div className="categories">
            {categories.map((category) => (
                <div key={category.id} className="category">
                    {category.icon ? (
                        <FontAwesomeIcon icon={category.icon} className="category-icon" />
                    ) : (
                        <FontAwesomeIcon icon="circle" className="category-icon" />
                    )}
                    <span>{category.name}</span>
                </div>
            ))}
        </div>
    );
}

export default Categories;
