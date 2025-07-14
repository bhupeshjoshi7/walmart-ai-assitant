import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataContext } from '../dataprovider/DataProvider';
import { auth } from '../../utility/firebase';
import Lowerheader from '../Header/Lowerheader';
import './Header.css';

function Header() {
  const [{ basket, user }] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <section className="wali-wrapper">
      <header className="wali-header">
        {/* Logo */}
        <div className="wali-logo">
          <Link to="/">
            <img src="/Wali.png" alt="Wali" />
          </Link>
        </div>

        <div className="wali-title">
          <h1>Wali.io</h1>
        </div>

        {/* Search Bar */}
        <div className="wali-search-bar">
          <select name="categories" id="categories">
            <option value="all">All</option>
          </select>
          <input type="text" placeholder="Search" />
        </div>

        {/* Right Section */}
        <div className="wali-header-right">
          <div>
            <h4>Welcome</h4>
          </div>

          {/* Cart */}
          <div className="wali-header-item wali-cart-icon">
            <Link to="/cart" className="wali-cart-icon">
              <img
                src="https://cdn-icons-png.flaticon.com/512/833/833314.png"
                alt="Cart"
                className="wali-cart-image"
              />
              <span className="wali-cart-count">{totalItem}</span>
            </Link>
          </div>
        </div>
      </header>
      <Lowerheader />
    </section>
  );
}

export default Header;
