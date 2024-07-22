import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const faqs = [
  {
    question: 'What is the return policy?',
    answer: 'Our return policy allows for returns within 30 days of purchase. Please ensure items are in their original condition and packaging.',
  },
  {
    question: 'How do I track my order?',
    answer: 'Once your order is shipped, you will receive a tracking number via email. You can use this number to track your order on our website.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we offer international shipping. Shipping costs and delivery times vary depending on the destination.',
  },
  {
    question: 'How can I contact customer support?',
    answer: 'You can contact our customer support team via email at support@example.com or by phone at (123) 456-7890.',
  },
  // Add more FAQs as needed
];

export default function FAQSection() {
  return (
   
    <div className="bg-light py-5">
        <h2 style={{color:'black',textAlign:'center',alignSelf:'center'}}>F&Qs Section</h2>
      <div className="container text-center">
        <h2 className="mb-4" style={{color:'#F87629'}}>Frequently Asked Questions</h2>
        <div className="accordion" id="faqAccordion">
          {faqs.map((faq, index) => (
            <div key={index} className="accordion-item">
              <h2 className="accordion-header" id={`heading${index}`}>
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${index}`}
                  aria-expanded="true"
                  aria-controls={`collapse${index}`}
                >
                  {faq.question}
                </button>
              </h2>
              <div
                id={`collapse${index}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${index}`}
                data-bs-parent="#faqAccordion"
              >
                <div className="accordion-body">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
