import { Routes, Route } from 'react-router-dom';
import LayOut from '../Components/LayOut/LayOut';
import Landing from './landing/Landing';
import Cart from './cart/Cart';
import Payment from './payment/Payment';
import Order from './order/Order'; // keep the filename even if route is /orders
import Signin from './Auth/Signin';
import Signup from './Auth/Sinup';
import Result from '../page/result/Result';
import ProductDetail from './productdetail/ProductDetail';
import ProtectRoute from '../Components/protectRoute';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const StripePromise = loadStripe(
  'pk_test_51RYvlx2L3Hws1uAmC1HmwRdXtiTedSDBNyfQMWivNJBKv4zdVoPyVfEB3iYQ2voTJHurfFpAoqK2sDk7mPLdEeB000FMFh84l6'
);

function Routing() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />

      <Route element={<LayOut />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Landing />} />
        <Route path="/cart" element={<Cart />} />

        <Route
          path="/payments"
          element={
            <ProtectRoute msg="You must log in to pay" redirect="/payments">
              <Elements stripe={StripePromise}>
                <Payment />
              </Elements>
            </ProtectRoute>
          }
        />

        {/* ✅ UPDATED PATH */}
        <Route
          path="/orders"
          element={
            <ProtectRoute msg="You must log in to access your orders" redirect="/orders">
              <Order />
            </ProtectRoute>
          }
        />

        <Route path="/category/:categoryName" element={<Result />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default Routing;
