import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ProductUrl } from '../../producturl/Producturl';
import ProductCard from '../../Components/product/ProductCard'; // ✅ Import your reusable card

function Result() {
  const { categoryName } = useParams(); // already encoded from URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${ProductUrl}/products/category/${categoryName}`
        );
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Category: {decodeURIComponent(categoryName)}</h1>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            products={product}
            renderDesc={false}
            renderAdd={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Result;
