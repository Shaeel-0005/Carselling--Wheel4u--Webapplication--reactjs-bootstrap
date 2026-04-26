import React from 'react';
import './services.css';

const servicePills = [
  'Buy & Sell',
  'Inspection Reports',
  'Price Valuation',
  'Financing',
  'Documentation',
];

const Services = () => {
  return (
    <section className="services-section">
      {/* Left: image */}
      <div className="services-image-wrap">
        <img
          src="https://images.unsplash.com/photo-1485463611174-f302f6a5c1c9?q=80&w=1476&auto=format&fit=crop"
          alt="Car dealership"
          className="services-image"
        />
        <div className="services-image-fade" />
      </div>

      {/* Right: content */}
      <div className="services-content">
        <p className="w4u-eyebrow">What we offer</p>
        <h2 className="services-title">
          OUR<br />SERVICES
        </h2>
        <p className="services-body">
          Your trusted Islamabad-based marketplace for buying and selling dream
          cars. We believe everyone deserves a smooth, transparent journey to
          find their perfect vehicle — with zero hidden costs and full peace of
          mind.
        </p>

        <div className="services-pills">
          {servicePills.map((pill, i) => (
            <span className="services-pill" key={i}>{pill}</span>
          ))}
        </div>

        <a href="/Products" className="w4u-btn-primary">
          Explore Cars →
        </a>
      </div>
    </section>
  );
};

export default Services;