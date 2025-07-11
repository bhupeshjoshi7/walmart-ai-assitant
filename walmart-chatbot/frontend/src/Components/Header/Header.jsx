import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../dataprovider/DataProvider'; // Your context
import { auth } from '../../utility/firebase'; // Firebase auth
import Lowerheader from '../Header/Lowerheader'; // Assuming this is your custom component
import './Header.css';

function Header() {
  const [{ basket, user }] = useContext(DataContext); // Access user and basket from context

  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

  // Sign Out Handler
  const handleAuth = () => {
    if (user) {
      auth.signOut(); // Sign out using Firebase
    }
  };

  return (
    <section className="fixed">
      <header className="header">
        {/* Logo */}
        <div className="logo">
          <Link to="/">
            <img
              src="/Wali.png"
              alt="Wali"
              
            />
          </Link>
        </div>
        <div className="title">
          <h1>Wali.io</h1>
        </div>


        {/* Search Bar */}
        <div className="search-bar">
          <select name="categories" id="categories">
            <option value="all">All</option>
          </select>
          <input type="text" placeholder="Search" />
        </div>


        {/* Right Section */}
        <div className="header-right">
          {/* Sign In / Sign Out */}
          <div>
            <h4>Welcome</h4>
          </div>

          {/* Returns & Orders */}
          {/* <div className="header-item">
            <Link to="/returns" className="line1">
              <div>Returns</div>
              <div>& Orders</div>
            </Link>
          </div> */}

          {/* Cart */}
          <div className="header-item cart-icon">
            <Link to="/cart" className="cart-icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
                alt="Cart"
                className="cart-image"
              />
              <span className="cart-count">{totalItem}</span>
            </Link>
          </div>
        </div>
      </header>
      <Lowerheader />
    </section>
  );
}

export default Header;
