import React from 'react';
import logo from '../assets/about.jpg';


const AboutUs = () => (

    <div className="container about-us flex justify-center ">
      <section className="hero mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className='mt-2 mb-3 p-0'>Wheel4u</h1>
            <p className='mt-2 mb-3 p-0 pr-5'>Your trusted Islamabad-based marketplace for buying and selling dream cars.We
          believe everyone deserves a smooth and transparent journey to find their a vision to simplify the car buying and selling experience. We
          believe everyon
          perfect car.</p>
            <a href='/Products '><button className="btn btn-primary mt-3 mb-5">Explore Cars</button></a>
            
          </div>
          <div className="col-md-6 mt-5">
          <img src={logo} alt="Used Car Dealership" className="img-fluid" />
          </div>
        </div>
      </section>


      <section className="about mt-5 mb-3">
        <h2 style={{color:'black'}}>Our Story</h2>
        <p className='mt-2 mb-3 p-0 pr-5 ' >
          Wheel4u was founded in 2024 by a group of passionate car enthusiasts
          with a vision to simplify the car buying and selling experience. We
          believe everyone deserves a smooth and transparent journey to find their
          perfect car.a vision to simplify the car buying and selling experience. We
          believe everyon
        </p>
      </section>
      <section className="services mt-5">
        <h2 style={{color:'black'}}>What We Offer</h2>
        <div className="row" mt-3>
          <div className="col-md-4">
            <div className="service-card ">
              <i className="fas fa-car"></i>
              <h3>Wide Selection</h3>
              <p>Browse a vast inventory of used cars across various makes and models.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-card">
              <i className="fas fa-dollar-sign"></i>
              <h3>Competitive Prices</h3>
              <p>Find great deals and transparent pricing on all our listed vehicles.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-card">
              <i className="fas fa-handshake"></i>
              <h3>Seamless Transactions</h3>
              <p>Enjoy a secure and hassle-free buying or selling process with our platform.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="team mt-5">
        <h2 style={{color:'black'}}>Meet the Team</h2>
        <p>Our team is dedicated to providing exceptional customer service.</p>
        
        <div className="row">
          <div className="col-md-3">
            <img src="https://via.placeholder.com/150" alt="Team Member 1" className="img-rounded" />
            <h4>John Doe</h4>
            <p>CEO</p>
          </div>
          {/* Add more team member profiles here */}
        </div>
      </section>
    </div>
  )


export default AboutUs;
