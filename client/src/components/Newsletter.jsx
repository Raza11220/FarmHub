import { useState } from "react";
import { toast } from "react-hot-toast";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success("Thanks for subscribing to FarmHub updates!");
    setEmail("");
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-card">
        <div>
          <span className="section-label">STAY UPDATED</span>
          <h2>Join our newsletter</h2>
        </div>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            aria-label="Email for newsletter"
          />
          <button type="submit" className="primary-btn">Subscribe</button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
