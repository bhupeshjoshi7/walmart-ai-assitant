// Product.jsx
import React, { useEffect, useState } from 'react';
import ProductCard from '../product/ProductCard';
import axios from 'axios';
import Loading from '../loading/Loading';
import './Product.css';  // Make sure to import the correct CSS file

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-wrapper">
        <Loading />
      </div>
    );
  }

  return (
    <div className="home-page"> {/* Add home-page class here */}
      <div className="product-container">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            products={product}
            flex={true}
            renderDesc={true}
            renderAdd={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Product;
