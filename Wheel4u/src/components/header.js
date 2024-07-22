import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './header.css';
import logo from '../assets/logo.png';
import { FaUserCircle } from 'react-icons/fa';


const Header = ({ isLoggedIn, username, onLogout, home, products, testimonials, login, signup, seller_dashboard }) => {

  return (
    <nav className="navbar navbar-expand-lg p-3 ps-5 pe-5" style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #0004' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/"><img src={logo} alt='logo' style={{ height: '2rem' }} /></a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className={`nav-link ${home}`} aria-current="page" href="/home">Home</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${products}`} aria-current="page" href="/products">Collection</a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${testimonials}`} aria-current="page" href="/testimonials">About Us</a>
            </li>
          </ul>
          {isLoggedIn ? (
            <div className="d-flex align-items-center">
              <span className="me-3">{username}</span>
              <a href="/seller_dashboard" className={`nav-link ${seller_dashboard}`}>
                <FaUserCircle size={30} />
              </a>
              <button type="button" className="btn btn-secondary ms-3" onClick={onLogout}>Logout</button>

            </div>
          ) : (
            <a href='/login' className={`nav-link ${login}`}>
              <button type="button" className="btn btn-primary" >Login</button>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
