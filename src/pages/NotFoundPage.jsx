import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="notFoundSection">
      <h2 className="sectionTitle">404</h2>
      <p className="notFoundText">The page you are looking for does not exist.</p>
      <Link to="/" className="ctaButton">
        Back to Home
      </Link>
    </section>
  );
}
