import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Products from './pages/products';
import Testimonials from './pages/about';
import Home from './pages/home';
import Nopage from './pages/NoPage';
import Login from './components/login';
import Sel_Dashborad from './pages/seller_dash';
import Signup from './components/signup';
import Header from './components/header';
import { login, logout } from '../src/Redux/auth/loginSlice';
import Footer from './components/footer';



import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';

const App = () => {
  const [cartItems, setCartItems] = React.useState([]);
  const dispatch = useDispatch();
  const { isLoggedIn, username } = useSelector((state) => state.auth);
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in when the component mounts
    const storedUsername = localStorage.getItem('name');
    if (storedUsername) {
      dispatch(login({ username: storedUsername }));
    }
  }, [dispatch]);

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost/Wheel4u_api/login.php', { email, password });
      if (response.data.success) {
        dispatch(login({ username: response.data.username }));
        localStorage.setItem('name', response.data.username);
      } else {
        alert(response.data.message); // Display error message
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('name');
  };

  // Determine active route for header
  const activeRoute = location.pathname;


  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        onLogout={handleLogout}
        home={activeRoute === '/' || activeRoute === '/home' ? 'active' : ''}
        products={activeRoute === '/products' ? 'active' : ''}
        testimonials={activeRoute === '/testimonials' ? 'active' : ''}
        login={activeRoute === '/login' ? 'active' : ''}
        signup={activeRoute === '/signup' ? 'active' : ''}
        seller_dashboard={activeRoute === '/seller_dashboard' ? 'active' : ''}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/seller_dashboard" element={<Sel_Dashborad />} />
        <Route path="*" element={<Nopage />} />
      </Routes>
      <Footer/>
      
    </>
  );
};

export default App;
