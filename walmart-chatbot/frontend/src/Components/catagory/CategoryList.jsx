import React from 'react';
import { Link } from 'react-router-dom';
import '../catagory/catagory.css';

function CategoryList({ data }) {
  if (!data) return null;

  // Safely encode the title for use in the URL
  const slug = encodeURIComponent(data.title?.toLowerCase());

  const categoryPath = `/category/${slug}`;

  return (
    <div className="category-card">
      <Link to={categoryPath}>
        <span className='contTitle'>
          <h2 className='tit'>{data.title}</h2>
        </span>
        <img src={data.image} alt={data.title || 'Category'} />
        <div className="category-title">
          <p>Shop</p>
        </div>
      </Link>
    </div>
  );
}

export default CategoryList;
