import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl, parseJsonResponse } from '../utils/api';

const initialFormData = {
  name: '',
  phone: '',
  cnic: '',
  address: '',
  email: '',
  password: '',
  role: 'buyer'
};

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...formData,
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      cnic: formData.cnic.trim(),
      address: formData.address.trim(),
      email: formData.email.trim().toLowerCase()
    };

    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch(apiUrl('insert_data.php?table=users'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await parseJsonResponse(response);

      if (!data.success) {
        throw new Error(data.message || 'Unable to register user.');
      }

      setFormData(initialFormData);
      alert(data.message || 'User registered successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Signup</h2>
          <form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone</label>
              <input type="tel" className="form-control" id="phone" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="cnic" className="form-label">CNIC</label>
              <input type="text" className="form-control" id="cnic" name="cnic" placeholder="Enter your CNIC" value={formData.cnic} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input type="text" className="form-control" id="address" name="address" placeholder="Enter your address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="role" className="form-label">Register as</label>
              <select className="form-control" id="role" name="role" value={formData.role} onChange={handleChange} required>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Signup'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
