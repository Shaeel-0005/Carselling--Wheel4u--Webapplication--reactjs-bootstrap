import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from '../Redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import PayButton from './PayButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4" style={{color:'black'}}>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          Your cart is currently empty
          <div className="mt-3">
            <Link to="/" className="btn btn-primary">
              <i className="bi bi-arrow-left"></i> Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="row bg-light p-2 mb-3">
            <div className="col-md-6"><strong>Product</strong></div>
            <div className="col-md-2"><strong>Price</strong></div>
            <div className="col-md-2"><strong>Quantity</strong></div>
            <div className="col-md-2"><strong>Total</strong></div>
          </div>
          {cart.cartItems.map((cartItem) => (
            <div className="row mb-3" key={cartItem._id}>
              <div className="col-md-6 d-flex align-items-center">
                <img src={cartItem.image?.url} alt={cartItem.name} className="img-fluid rounded" style={{ width: '50px', marginRight: '15px' }} />
                <div>
                  <h5>{cartItem.name}</h5>
                  <p>{cartItem.desc}</p>
                  <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCart(cartItem)}>
                    Remove
                  </button>
                </div>
              </div>
              <div className="col-md-2 d-flex align-items-center">Rs.{cartItem.price}</div>
              <div className="col-md-2 d-flex align-items-center">
                {/* <button className="btn btn-secondary btn-sm" onClick={() => handleDecreaseCart(cartItem)}>-</button> */}
                <div className="px-2">{cartItem.cartQuantity}</div>
                {/* <button className="btn btn-secondary btn-sm" onClick={() => handleAddToCart(cartItem)}>+</button> */}
              </div>
              <div className="col-md-2 d-flex align-items-center">
                Rs.{cartItem.price * cartItem.cartQuantity}
              </div>
            </div>
          ))}
          <div className="row mt-4">
            <div className="col-md-12 text-end">
              <button className="btn btn-danger" onClick={handleClearCart}>Clear Cart</button>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12 text-end">
              <h4>Subtotal: Rs.{cart.cartTotalAmount}</h4>
              <p>Taxes and shipping calculated at checkout</p>
              { auth._id ? (
                <PayButton cartItems={cart.cartItems} />
              ) : (
                <button className="btn btn-primary" onClick={() => navigate('/login')}>
                  Login to Check out
                </button>
              )}
              <div className="mt-3">
                <Link to="/" className="btn btn-secondary">
                  <i className="bi bi-arrow-left"></i> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
