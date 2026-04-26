import React, { useState } from 'react';
import './faq.css';

const faqs = [
  {
    question: 'What is the return policy?',
    answer:
      'Our return policy allows for returns within 30 days of purchase. Please ensure items are in their original condition and packaging.',
  },
  {
    question: 'How do I track my order?',
    answer:
      'Once your order is shipped, you will receive a tracking number via email. You can use this number to track your order on our website.',
  },
  {
    question: 'Do you offer international shipping?',
    answer:
      'Yes, we offer international shipping. Shipping costs and delivery times vary depending on the destination country.',
  },
  {
    question: 'How can I contact customer support?',
    answer:
      'You can contact our customer support team via email at support@wheel4u.pk or by phone at (051) 234-5678 during business hours.',
  },
  {
    question: 'Are all listed cars inspected before sale?',
    answer:
      'Every car on our platform goes through a multi-point inspection by certified mechanics. Inspection reports are available on every listing page.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="faq-section">
      {/* Left column */}
      <div className="faq-left">
        <p className="w4u-eyebrow">Got questions?</p>
        <h2 className="faq-headline">
          NEED<br />ANSWERS<br />
          <span className="faq-headline__accent">FAST?</span>
        </h2>
        <p className="faq-intro">
          Everything you need to know about buying, selling, and everything
          in between. Can't find what you need? Reach out directly.
        </p>
        <a href="mailto:support@wheel4u.pk" className="w4u-btn-primary">
          Email Support →
        </a>
      </div>

      {/* Right column — accordion */}
      <div className="faq-right">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div className={`faq-item${isOpen ? ' faq-item--open' : ''}`} key={i}>
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  {isOpen ? '×' : '+'}
                </span>
              </button>
              <div
                className="faq-answer"
                style={{ maxHeight: isOpen ? '300px' : '0' }}
              >
                <p className="faq-answer__text">{faq.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FAQSection;