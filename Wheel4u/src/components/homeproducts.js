import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './homeproducts.css';
import { apiUrl } from '../utils/api';
import { mockProducts, sortProductsByDate } from '../data/mockProducts';

const Products = ({ addToCart }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    axios
      .get(apiUrl('fetch_data.php?table=products'))
      .then((response) => {
        const products = Array.isArray(response.data) ? response.data : [];

        if (products.length === 0) {
          setData(sortProductsByDate(mockProducts).slice(0, 4));
          setIsUsingFallback(true);
          setLoading(false);
          return;
        }

        setData(sortProductsByDate(products).slice(0, 4));
        setIsUsingFallback(false);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setData(sortProductsByDate(mockProducts).slice(0, 4));
        setIsUsingFallback(true);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    if (addToCart) {
      addToCart(product);
    }
  };

  return (
    <section className="products-section">
      <div className="products-header">
        <div>
          <p className="w4u-eyebrow">Fresh arrivals</p>
          <h2 className="products-title">LATEST LISTINGS</h2>
          {isUsingFallback && (
            <p className="mb-0 text-muted">Demo products are currently being shown.</p>
          )}
        </div>
        <a href="/Products" className="products-view-all">
          View All ->
        </a>
      </div>

      {loading ? (
        <div className="products-loading">
          <div className="products-loading__spinner" />
          <p>Loading listings...</p>
        </div>
      ) : (
        <div className="products-grid">
          {data.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-card__img-wrap">
                <img
                  src={product.image_path}
                  alt={product.name}
                  className="product-card__img"
                />
              </div>
              <div className="product-card__body">
                <p className="product-card__tag">Featured</p>
                <h3 className="product-card__name">{product.name}</h3>
                <p className="product-card__desc">{product.description}</p>
                <div className="product-card__footer">
                  <span className="product-card__price">
                    Rs. {Number(product.price).toLocaleString()}
                  </span>
                  <button
                    className="product-card__cart-btn"
                    onClick={() => handleAddToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Products;
