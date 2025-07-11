import React from 'react';
import { categories } from './categories.js';
import CategoryList from './CategoryList.jsx';

function CatagoryCard() {
  return (
    <div className="categories-container">
      {categories.map((info, index) => (
        <CategoryList key={index} data={info} />
      ))}
    </div>
  );
}

export default CatagoryCard;
