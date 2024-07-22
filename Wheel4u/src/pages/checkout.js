import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PayButton from '../components/PayButton';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault();
    // Implement any additional payment logic if needed
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-8">
          <h2>Checkout</h2>
          <form onSubmit={handlePayment}>
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full Name</label>
              <input type="text" className="form-control" id="fullName" required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" required />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" required />
            </div>
            <div className="mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input type="text" className="form-control" id="city" required />
            </div>
            <div className="mb-3">
              <label htmlFor="zip" className="form-label">Zip Code</label>
              <input type="text" className="form-control" id="zip" required />
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <input type="text" className="form-control" id="country" required />
            </div>
            <button type="submit" className="btn btn-primary">
              Proceed to Payment
            </button>
          </form>
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <ul className="list-group mb-3">
            {cart.cartItems.map((item) => (
              <li className="list-group-item d-flex justify-content-between lh-sm" key={item._id}>
                <div>
                  <h6 className="my-0">{item.name}</h6>
                  <small className="text-muted">Qty: {item.cartQuantity}</small>
                </div>
                <span className="text-muted">Rs.{item.price * item.cartQuantity}</span>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (Rs.)</span>
              <strong>Rs.{cart.cartTotalAmount}</strong>
            </li>
          </ul>
          {auth._id ? (
            <PayButton cartItems={cart.cartItems} />
          ) : (
            <button className="btn btn-primary" onClick={() => navigate('/login')}>
              Login to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
