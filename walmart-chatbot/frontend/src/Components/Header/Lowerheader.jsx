import React from 'react';
import { IoMdMenu } from "react-icons/io";
import './Lower.css'; // Scoped styles with wali- prefix

function Lowerheader() {
  return (
    <ul className="wali-lower-header">
      <li className="wali-menu-item">
        <IoMdMenu className="wali-menu-icon" />
        <span>All</span>
      </li>
      <li className="wali-menu-item">Today's Deals</li>
      <li className="wali-menu-item">Customer Service</li>
      <li className="wali-menu-item">Registration</li>
      <li className="wali-menu-item">Gift</li>
      <li className="wali-menu-item">Sell</li>
    </ul>
  );
}

export default Lowerheader;
