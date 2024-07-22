import React from 'react';

const Sidebar = ({ onTabChange }) => {
  return (
    <div className="d-flex flex-column bg-light p-3" style={{ height: '100vh', width: '250px' }}>
      
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a className="nav-link " href="#" onClick={() => onTabChange('home')}>Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={() => onTabChange('Add_Product')}>Add Product</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={() => onTabChange('Cart')}>Cart</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
