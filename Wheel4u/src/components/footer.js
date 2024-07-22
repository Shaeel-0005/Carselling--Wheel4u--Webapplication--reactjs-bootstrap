import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-white py-4 ">
      <div className="container">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        <p className="mb-0">
          Made with ❤️ by Your Team
        </p>
      </div>
    </footer>
  );
}

export default Footer;
