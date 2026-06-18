import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminDashboardPage() {
  const { logout } = useAuth();

  return (
    <section className="adminSection">
      <h2 className="sectionTitle">Admin Dashboard</h2>
      <p className="adminWelcome">Welcome, Admin!</p>
      <div className="adminActions">
        <Link to="/admin/products" className="ctaButton">
          Manage Products
        </Link>
        <button className="dangerButton" onClick={logout}>
          Log Out
        </button>
      </div>
    </section>
  );
}
