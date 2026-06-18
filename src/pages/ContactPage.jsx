import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }
    return newErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setErrors({});
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  }

  return (
    <section className="contactSection">
      <h2 className="sectionTitle">Contact Us</h2>
      <p className="contactText">Phone: 0123456789</p>
      <p className="contactText">We&rsquo;d love to hear from you!</p>

      {submitted ? (
        <p className="contactSuccess">Your message has been sent!</p>
      ) : (
        <form className="contactForm" onSubmit={handleSubmit} noValidate>
          <div className="formGroup">
            <label htmlFor="contactName">Name</label>
            <input
              id="contactName"
              type="text"
              name="name"
              className="formInput"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="formError">{errors.name}</p>}
          </div>

          <div className="formGroup">
            <label htmlFor="contactEmail">Email</label>
            <input
              id="contactEmail"
              type="email"
              name="email"
              className="formInput"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="formError">{errors.email}</p>}
          </div>

          <div className="formGroup">
            <label htmlFor="contactMessage">Message</label>
            <textarea
              id="contactMessage"
              name="message"
              className="formTextarea"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            {errors.message && <p className="formError">{errors.message}</p>}
          </div>

          <button type="submit" className="ctaButton">
            Send Message
          </button>
        </form>
      )}
    </section>
  );
}
