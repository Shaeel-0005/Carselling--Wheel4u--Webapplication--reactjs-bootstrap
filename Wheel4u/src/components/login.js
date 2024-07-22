import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../Redux/auth/loginSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, username } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      alert('Email and password are required');
      return;
    }

    fetch('http://localhost/Wheel4u_api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          alert('Login successful!');
          dispatch(login({ username: data.username, isLoggedIn: true })); 
          if (data.role === 'buyer') {
            // Navigate to buyer dashboard or home page
            {console.log(username)}
          } else if (data.role === 'seller') {
            // Navigate to seller dashboard
          }
        } else {
          alert('Login failed: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Network error occurred. Please try again later.');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            <a href='/signup'><button type="button" className="btn btn-secondary w-100 mt-2">Signup</button></a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
