import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Products = ({ addToCart }) => {
  const [data, setData] = useState([]);
  const tableName = 'products';

  useEffect(() => {
    axios
      .get(`http://localhost/Wheel4u_api/fetch_data.php?table=${tableName}`)
      .then((response) => {
        const sortedData = response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const latestData = sortedData.slice(0, 4);
        setData(latestData);
      })
      .catch((error) => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="bg-white mt-5">
      <div className="container py-5">
        <h2 className='sr-only mx-4 fw-bold' style={{color:'black'}}>Products</h2>
        <div className="row ">
          {data.map((product) => (
            <div key={product.id} className="col-sm-6 col-lg-3 mb-4 mt-3">
              <div className="card h-100">
                <img
                  src={product.image_path}
                  className="card-img-top"
                  alt={product.description}
                />
                <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                  <p className="card-text p-0">Rs.{product.description}</p>
                  <p className="card-text p-0 fw-bold">Rs.{product.price}</p>
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
