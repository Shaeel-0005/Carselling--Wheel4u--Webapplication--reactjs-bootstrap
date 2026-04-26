import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../Redux/slices/cartSlice';
import 'bootstrap/dist/css/bootstrap.min.css';
import { apiUrl } from '../utils/api';
import { mockProducts, sortProductsByDate } from '../data/mockProducts';

const Products = () => {
  const [data, setData] = useState([]);
  const [isUsingFallback, setIsUsingFallback] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(apiUrl('fetch_data.php?table=products'))
      .then((response) => {
        const products = Array.isArray(response.data) ? response.data : [];

        if (products.length === 0) {
          setData(sortProductsByDate(mockProducts));
          setIsUsingFallback(true);
          return;
        }

        setData(sortProductsByDate(products));
        setIsUsingFallback(false);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
        setData(sortProductsByDate(mockProducts));
        setIsUsingFallback(true);
      });
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white">
      <div className="container py-5">
        {isUsingFallback && (
          <div className="alert alert-info mb-4" role="alert">
            Showing demo products on the frontend because the live product API is unavailable.
          </div>
        )}
        <div className="row">
          {data.map((product) => (
            <div key={product.id} className="col-sm-6 col-lg-3 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <img
                  src={product.image_path}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '220px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted mb-2">
                    {product.brand} | {product.year}
                  </p>
                  <p className="card-text flex-grow-1">{product.description}</p>
                  <p className="card-text fw-bold mb-3">
                    Rs. {Number(product.price).toLocaleString()}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
