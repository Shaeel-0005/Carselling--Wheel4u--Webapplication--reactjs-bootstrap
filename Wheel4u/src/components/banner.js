import React from 'react';
import './banner.css';

const stats = [
  { value: '1,200+', label: 'Verified Listings' },
  { value: '98%',    label: 'Happy Customers'  },
  { value: '100%',   label: 'Secure Transactions' },
  { value: '5yr+',   label: 'Trusted Since'    },
];

const Banner = () => {
  return (
    <div className="banner-strip">
      {stats.map((stat, i) => (
        <div className="banner-stat" key={i}>
          <span className="banner-stat__value">{stat.value}</span>
          <span className="banner-stat__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Banner;