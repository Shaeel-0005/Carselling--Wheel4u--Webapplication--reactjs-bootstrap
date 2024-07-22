
import React, { useState, useEffect } from 'react';
import Carousal from '../components/crousal';
import Banner from '../components/banner';
import Services from '../components/services';
import Products from '../components/homeproducts';
import Faq from '../components/F&Q';
import axios from 'axios';

const Home = () => {

  return (
    <div>
      <Carousal/>
      <Banner />
      <Services/>
      <Products/>
      <Faq/>
    </div>
  );
};

export default Home;
