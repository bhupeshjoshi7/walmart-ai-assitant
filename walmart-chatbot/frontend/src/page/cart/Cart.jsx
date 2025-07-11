import React, { useContext } from 'react';
import { DataContext } from '../../Components/dataprovider/DataProvider';
import CurrencyFormat from '../../Components/currency/CurrencyFormat';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import './cart.css';
import { Type } from '../../utility/action.type';

function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);

  const total = basket.reduce((amount, item) => {
    const itemTotal = (Number(item.price) || 0) * (Number(item.amount) || 1);
    return amount + itemTotal;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.INCREMENT,
      id: item.id,
    });
  };

  const decrement = (item) => {
    dispatch({
      type: Type.DECREMENT,
      id: item.id,
    });
  };

  return (
    <div
      className='ccontainer'
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '20px',
      }}
    >
      {/* LEFT: Cart Items */}
<div className='cart-container' style={{ flex: 2, marginTop: '-45px', width: '600px' }}>


        <h2>Your Shopping Cart</h2>

        {basket.length === 0 ? (
          <p className='empty-cart'>Your cart is empty.</p>
        ) : (
          basket.map((item, index) => (
            <section
              key={index}
              className='cart-product'
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '20px',
                padding: '10px 0',
                borderBottom: '1px solid #ddd',
                
              }}
            >
              <img src={item.image} alt={item.title} className='ccart-image' />

              <div
                className='product-info'
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                <h4>{item.title}</h4>
                <p>Rating: ⭐ {item.rating?.rate || 4.5}</p>
                <p>Price: ${item.price}</p>
              </div>

              <div
                className='btn-container'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <button className='btn' onClick={() => increment(item)} disabled={item.amount <= 0}>
                  <IoIosArrowUp size={20} />
                </button>
                <span>{item.amount}</span>
                <button className='btn' onClick={() => decrement(item)} disabled={item.amount <= 1}>
                  <IoIosArrowDown size={20} />
                </button>
              </div>
            </section>
          ))
        )}
      </div>

      {/* RIGHT: Subtotal */}
      {basket.length !== 0 && (
        <div
          className='cart-footer'
          style={{
            flex: 1,
            // alignSelf: 'flex-start', // aligns to top right
            marginTop: '55px',
            marginRight:"20px",
          }}
        >
          <div className='subtotal'>
            <p>
              Subtotal ({basket.reduce((sum, item) => sum + item.amount, 0)} items):
            </p>
            <CurrencyFormat value={total.toFixed(2)} />

            <div className='gift-option'>
              <input type='checkbox' id='gift' />
              <label htmlFor='gift'>This order contains a gift</label>
            </div>

            <Link
              to='/payments'
              className='checkout-link'
              style={{
                width: '100%',
                textAlign: 'center',
                padding: '10px',
                borderRadius: '5px',
                color: 'white',
                fontWeight: 'bold',
                backgroundColor: 'orange',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#ff7a00';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'orange';
              }}
            >
              Continue to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
