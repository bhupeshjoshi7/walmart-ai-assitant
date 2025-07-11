import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import CurrencyFormat from '../currency/CurrencyFormat';
import { Link } from 'react-router-dom';
import '../product/Product.css';
import { DataContext } from '../dataprovider/DataProvider';
import { Type } from '../../utility/action.type';

function ProductCard({ products, flex, renderDesc, renderAdd }) {
  if (!products) return null;

  const { image, title, rating = {}, id, price, description } = products;
  const [state, dispatch] = useContext(DataContext);

  const addToCart = (product) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        amount: 1,
      },
    });
  };

  return (
    <div className={`product-card ${flex ? 'product-flexed' : ''}`}>
      <Link to={`/product/${id}`} className="product-image-wrapper">
        <img src={image} alt={title} className="product-image" />
      </Link>

      <div className="product-details">
        <h3>{title}</h3>

        {/* ✅ Always show rating */}
        <div className="rating">
          <Rating
            value={rating?.rate || 0}
            precision={0.1}
            readOnly
            style={{
              color: rating?.rate > 0 ? '#e76d00' : '#ccc',
            }}
          />
          <small>{rating?.count ?? 0} reviews</small>
        </div>

        <div>
          <CurrencyFormat value={price} />
        </div>

        {/* {renderDesc && (
          <p className="description">
            {description?.trim() ? description : 'No description available.'}
          </p>
        )} */}

        {renderAdd && (
          <button className="button" onClick={() => addToCart(products)}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
