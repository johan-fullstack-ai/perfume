import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      Promise.resolve().then(() => {
        navigate("/admin/dashboard", { replace: true });
      });
    }
  }, [isAdmin, navigate]);

  if (isAdmin) return null;

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const success = login(password);
    if (success) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      setError("Incorrect password. Please try again.");
    }
  }

  return (
    <section className="adminSection">
      <h2 className="sectionTitle">Admin Login</h2>
      <form className="adminForm" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="adminPassword">Password</label>
          <input
            id="adminPassword"
            type="password"
            className="formInput"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {error && <p className="formError">{error}</p>}
        <button type="submit" className="ctaButton">
          Log In
        </button>
      </form>
    </section>
  );
}
