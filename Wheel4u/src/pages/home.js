import React from 'react';
import Carousal from '../components/crousal';
import Banner from '../components/banner';
import Services from '../components/services';
import Products from '../components/homeproducts';
import Faq from '../components/F&Q';
import '../styles/theme.css';

const Home = () => {
  return (
    <div style={{ background: '#0D0D0D', minHeight: '100vh' }}>
      <Carousal />
      <Banner />
      <Services />
      <Products />
      <Faq />
    </div>
  );
};

export default Home;