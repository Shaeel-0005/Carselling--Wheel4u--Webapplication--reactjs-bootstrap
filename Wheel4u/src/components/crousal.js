import React, { useState, useEffect, useCallback } from 'react';
import './crousal.css';

const slides = [
  {
    image:
      'https://images.unsplash.com/photo-1490902931801-d6f80ca94fe4?q=80&w=1470&auto=format&fit=crop',
    label: "Islamabad's Premier Auto Marketplace",
    titleLine1: 'CHOOSE YOUR',
    titleAccent: 'STYLE.',
    subtitle:
      'Find your perfect car with transparent pricing and no hidden costs — every time.',
    cta: { label: 'Explore Cars →', href: '/Products' },
    ctaSecondary: { label: 'How It Works', href: '/about' },
  },
  {
    image:
      'https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=1470&auto=format&fit=crop',
    label: 'Limited Time Offer',
    titleLine1: 'GET UP TO',
    titleAccent: '25% OFF.',
    subtitle:
      'Exclusive discounts on selected models this season. Drive home the deal.',
    cta: { label: 'View Deals →', href: '/Products' },
    ctaSecondary: { label: 'Contact Us', href: '/contact' },
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 5500);
    return () => clearInterval(timer);
  }, [current, goTo]);

  return (
    <div className="carousel-wrap">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div className="carousel-slide" key={i}>
            <img src={slide.image} alt={`Slide ${i + 1}`} className="carousel-img" />
            <div className="carousel-overlay" />
            <div className="carousel-content">
              <p className="carousel-label">{slide.label}</p>
              <h1 className="carousel-title">
                {slide.titleLine1}
                <br />
                <span className="carousel-title-accent">{slide.titleAccent}</span>
              </h1>
              <p className="carousel-subtitle">{slide.subtitle}</p>
              <div className="carousel-ctas">
                <a href={slide.cta.href} className="w4u-btn-primary">
                  {slide.cta.label}
                </a>
                <a href={slide.ctaSecondary.href} className="w4u-btn-ghost">
                  {slide.ctaSecondary.label}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button
        className="carousel-arrow carousel-arrow--prev"
        onClick={() => goTo(current - 1)}
        aria-label="Previous slide"
      >
        ‹
      </button>
      <button
        className="carousel-arrow carousel-arrow--next"
        onClick={() => goTo(current + 1)}
        aria-label="Next slide"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot${i === current ? ' carousel-dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;