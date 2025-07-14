import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../../Components/currency/CurrencyFormat';
import Loading from '../../Components/loading/Loading';
import '../../Components/product/Product.css';
import '../productdetail/ProductD.css';
import ProductCard from '../../Components/product/ProductCard';
import { DataContext } from '../../Components/dataprovider/DataProvider';
import { Type } from '../../utility/action.type';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [state, dispatch] = useContext(DataContext);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Validate productId
        if (!productId || isNaN(productId)) {
          throw new Error('Invalid product ID');
        }

        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        
        if (!response.data) {
          throw new Error('Product not found');
        }
        
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message || 'Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  const addToCart = async () => {
    try {
      setAddingToCart(true);
      
      // Simulate a brief delay for better UX
      await new Promise(resolve => setTimeout(resolve, 200));
      
      dispatch({
        type: Type.ADD_TO_BASKET,
        item: { 
          image: product.image, 
          title: product.title, 
          rating: product.rating, 
          id: productId, 
          price: product.price 
        },
      });
      
      // Optional: Show success message or navigate
      // You could add a toast notification here
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Handle error (show toast, etc.)
    } finally {
      setAddingToCart(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="wali-loading-wrapper">
        <Loading />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="wali-error-wrapper">
        <div className="wali-error-content">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button 
            onClick={() => navigate('/')} 
            className="wali-back-button"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="wali-error-wrapper">
        <div className="wali-error-content">
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/')} 
            className="wali-back-button"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  const { image, title, price, description, rating } = product;

  return (
    <div className="wali-product-detail">
      <div className="wali-product-image-container">
        <img 
          src={image} 
          alt={title} 
          className="wali-product-image"
          onError={(e) => {
            e.target.src = '/placeholder-image.jpg'; // Fallback image
          }}
        />
      </div>
      
      <div className="wali-product-info">
        <h1>{title}</h1>
        
        <div className="wali-rating-section">
          <Rating value={rating?.rate || 0} precision={0.1} readOnly />
          <span className="wali-rating-count">
            ({rating?.count || 0} reviews)
          </span>
        </div>
        
        <div className="wali-price-section">
          <CurrencyFormat amount={price} />
        </div>
        
        <p className="wali-description">{description}</p>
        
        <div className="wali-actions">
          <button 
            onClick={addToCart}
            disabled={addingToCart}
            className={`wali-add-to-cart-button ${addingToCart ? 'loading' : ''}`}
          >
            {addingToCart ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>

      {/* Optional: reuse ProductCard instead of custom UI */}
      {/* <ProductCard products={product} renderDesc={false} renderAdd={true} /> */}
    </div>
  );
}

export default ProductDetail;