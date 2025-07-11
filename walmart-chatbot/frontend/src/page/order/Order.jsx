// Order.jsx
import React, { useContext, useState, useEffect } from 'react';
import { db } from '../../utility/firebase';
import { DataContext } from '../../Components/dataprovider/DataProvider';
import './order.css';
import ProductCard from '../../Components/product/ProductCard';
import { useLocation } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

function Order() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const ordersRef = collection(db, 'users', user.uid, 'orders');
      const ordersQuery = query(ordersRef, orderBy('created', 'desc'));
      const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
        setOrders(snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })));
      });

      return () => unsubscribe();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <section className="order-page"> {/* Add order-page class here */}
      <div className="orders_container">
        <h2>Orders</h2>

        {location?.state?.msg && (
          <div style={{ padding: '10px', color: 'green', fontWeight: 'bold' }}>
            {location.state.msg}
          </div>
        )}

        {orders?.length === 0 ? (
          <div style={{ padding: '20px' }}>You do not have any orders yet.</div>
        ) : (
          orders.map((eachOrder) => (
            <div key={eachOrder.id}>
              <hr />
              <p>Order ID: {eachOrder?.id}</p>
              {eachOrder?.data?.basket?.map((orderItem, index) => (
                <ProductCard
                  key={index}
                  flex={true}
                  products={orderItem}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Order;
