import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import Navbar from "../components/Navbar";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, phone, email, message } = formData;

    const subject = `FarmHub Enquiry from ${name}`;

    const body = `
Hello FarmHub,

I would like to make an enquiry.

Name: ${name}
Phone: ${phone}
Email: ${email}

Message:
${message}

Regards,
${name}
`;

    const mailtoLink =
      `mailto:info@hmftj.com` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    // Open email application
    window.location.href = mailtoLink;
  };

  return (
    <>
      <Navbar />
        
        <main className="contact-page">

        {/* ================= HEADER ================= */}

        <section className="contact-header">

            <span className="section-label">
            GET IN TOUCH
            </span>

            <h1>
            Let's Talk About
            <br />
            <span>Livestock.</span>
            </h1>

            <p>
            Have a question about an animal?
            Send us an enquiry and our team will
            get back to you.
            </p>

        </section>


        {/* ================= CONTACT LAYOUT ================= */}

        <section className="contact-layout">

            {/* ================= CONTACT INFO ================= */}

            <div className="contact-info">

            {/* Phone */}

            <div className="contact-info-card">

                <div className="contact-icon">
                <Phone size={22} />
                </div>

                <div>
                <span>Call Us</span>

                <a href="tel:+923001234567">
                    +92 300 1234567
                </a>
                </div>

            </div>


            {/* Email */}

            <div className="contact-info-card">

                <div className="contact-icon">
                <Mail size={22} />
                </div>

                <div>
                <span>Email</span>

                <a href="mailto:info@hmftj.com">
                    info@hmftj.com
                </a>
                </div>

            </div>


            {/* Location */}

            <div className="contact-info-card">

                <div className="contact-icon">
                <MapPin size={22} />
                </div>

                <div>
                <span>Location</span>

                <strong>
                    Punjab, Pakistan
                </strong>
                </div>

            </div>

            </div>


            {/* ================= FORM ================= */}

            <form
            className="contact-form"
            onSubmit={handleSubmit}
            >

            <h2>
                Send an Enquiry
            </h2>


            {/* Name + Phone */}

            <div className="form-row">

                <div className="form-group">

                <label>
                    Your Name
                </label>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                </div>


                <div className="form-group">

                <label>
                    Phone Number
                </label>

                <input
                    type="tel"
                    name="phone"
                    placeholder="03XX XXXXXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />

                </div>

            </div>


            {/* Email */}

            <div className="form-group">

                <label>
                Email Address
                </label>

                <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                />

            </div>


            {/* Message */}

            <div className="form-group">

                <label>
                Message
                </label>

                <textarea
                name="message"
                rows="6"
                placeholder="Tell us what you are interested in..."
                value={formData.message}
                onChange={handleChange}
                required
                />

            </div>


            {/* Submit */}

            <button
                type="submit"
                className="contact-submit"
            >

                <Send size={18} />

                Send Enquiry

            </button>

            </form>

        </section>

        </main>
    </>
  );
}

export default Contact;