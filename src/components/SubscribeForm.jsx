import { useState, useEffect} from "react";
import { useLocation } from "react-router-dom";
import { validateEmail } from "../utils/emailValidation";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();

  useEffect(() => {
    setMessage("");
    setError("");
  }, [location.pathname]);

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setMessage("Thanks for subscribing!");
    setEmail("");
  }

  return (
    <form className="subscribeForm" onSubmit={handleSubmit}>
      <label htmlFor="subscribeEmail" className="subscribeLabel">
        Stay updated
      </label>
      <div className="subscribeRow">
        <input
          id="subscribeEmail"
          type="email"
          className="subscribeInput"
          placeholder="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <button type="submit" className="ctaButton subscribeButton">
          Subscribe
        </button>
      </div>
      {error && <p className="subscribeError">{error}</p>}
      {message && <p className="subscribeSuccess">{message}</p>}
    </form>
  );
}
