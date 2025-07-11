import React, { useContext, useState } from 'react';
import { DataContext } from '../../Components/dataprovider/DataProvider';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/currency/CurrencyFormat';
import ProductCard from '../../Components/product/ProductCard';
import './Payment.css';
import { axiosInstance } from '../../Api/axios';
import { db } from '../../utility/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

function Payment() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  const [cardError, setCardError] = useState('');
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const total = basket?.reduce((amount, item) => {
    return amount + (Number(item.price) || 0) * (Number(item.amount) || 1);
  }, 0);

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setCardError('');

    try {
      const response = await axiosInstance.post('/payment/create', { total });
      const clientSecret = response.data.clientSecret;

      const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) throw new Error(error.message);

      const orderRef = doc(db, 'users', user.uid, 'orders', paymentIntent.id);
      await setDoc(orderRef, {
        basket,
        amount: paymentIntent.amount,
        created: new Date(paymentIntent.created * 1000),
      });

      dispatch({ type: 'EMPTY_BASKET' });
      setProcessing(false);
      navigate('/orders', { state: { msg: 'You have placed a new order' } });
    } catch (err) {
      console.error('Payment error:', err);
      setCardError('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <section className='payment-container'>
      <h3 className='payment-header'>
        Checkout ({basket?.length || 0} item{basket?.length !== 1 ? 's' : ''})
      </h3>

      <form onSubmit={handlePayment}>
        {/* Address Section */}
        <div className='flex'>
          <h4>Delivery Address</h4>
          <div>
            <p>{user?.email}</p>
            <p>123 React Street</p>
            <p>dz, ethiopia</p>
          </div>
        </div>
        <hr />

        {/* Basket Review */}
        <div className='flex'>
          <h4>Review Items</h4>
          <div>
          {basket.map((item) => (
            <ProductCard  products={item} flex={true} />
          ))}
          </div>
        </div>

        {/* Payment Section */}
        <div className='flex'>
          <h4>Payment Method</h4>
          <div className="payment-card-container">
            <CardElement onChange={(e) => setCardError(e?.error?.message || '')} />
            {cardError && <small style={{ color: 'red' }}>{cardError}</small>}
            <CurrencyFormat amount={total} />
            <button disabled={processing} className='button-payment' type='submit'>
              {processing ? <ClipLoader size={12} color='gray' /> : 'Pay Now'}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Payment;
