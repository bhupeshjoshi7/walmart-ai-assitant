import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../../Components/currency/CurrencyFormat';
import Loading from '../../Components/loading/Loading';
import '../../Components/product/Product.css';
import '../productdetail/ProductD.css';
import ProductCard from '../../Components/product/ProductCard';
import { DataContext } from '../../Components/dataprovider/DataProvider';
import { Type } from '../../utility/action.type'; // Make sure this exists

function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useContext(DataContext);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  if (loading) {
    return (
      <div className="loading-wrapper">
        <Loading />
      </div>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const { image, title, price, description, rating } = product;

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { image, title, rating, id: productId, price },
    });
  };

  return (
    <div className="product-detail">
      <img src={image} alt={title} className="product-image" />
      <div className="product-info">
        <h2>{title}</h2>
        <Rating value={rating?.rate || 0} precision={0.1} readOnly />
        <p>{rating?.count || 0} reviews</p>
        <CurrencyFormat amount={price} />
     <p className="description">{description}</p>
        <button onClick={addToCart}>Add to Cart</button>
      </div>

      {/* Optional: reuse ProductCard instead of custom UI */}
      {/* <ProductCard products={product} renderDesc={false} renderAdd={true} /> */}
    </div>
  );
}

export default ProductDetail;
