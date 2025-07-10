import React from 'react';
import { IoMdMenu } from "react-icons/io";
import './Lower.css'; // Or create separate LowerHeader.css if preferred

function Lowerheader() {
  return (<>
    <ul className="lower-header">
      <li className="menu-item">
        <IoMdMenu className="menu-icon" />
        <span>All</span>
      </li>
      <li>Today's Deals</li>
      <li>Customer Service</li>
      <li>Registration</li>
      <li>Gift</li>
      <li>Sell</li>
    </ul>
  
  
 </>
  
  );

}

export default Lowerheader;
