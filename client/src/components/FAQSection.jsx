const faqItems = [
  {
    question: "How does FarmHub verify its livestock?",
    answer:
      "Every listing includes breeder details, health information, and verified sourcing references so buyers can assess quality before placing an order.",
  },
  {
    question: "Can I track my order after checkout?",
    answer:
      "Yes. Your dashboard shows the current order status from pending to delivery, so you can monitor progress without leaving the app.",
  },
  {
    question: "Do you support secure payment options?",
    answer:
      "The checkout includes ready-to-integrate payment methods, including cash on delivery, Stripe, JazzCash, and EasyPaisa flows for deployment.",
  },
  {
    question: "What if I need help with a purchase?",
    answer:
      "Use the contact form or call our support team. We help with livestock selection, shipping details, and order support for every sale.",
  },
];

function FAQSection() {
  return (
    <section className="faq-section" id="faq">
      <div className="section-heading centered">
        <div>
          <span>FREQUENTLY ASKED QUESTIONS</span>
          <h2>Everything you need to know</h2>
        </div>
      </div>

      <div className="faq-list">
        {faqItems.map((item) => (
          <div key={item.question} className="faq-item">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
