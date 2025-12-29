import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { ProductContext } from "../context/ProductContext.jsx";
import { Link } from "react-router-dom";

/* ---------- SVG ROLE ICON ---------- */
const RoleIcon = ({ role }) => {
  if (role === "admin") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l4 8h6l-5 4 2 8-7-4-7 4 2-8-5-4h6z" />
      </svg>
    );
  }

  if (role === "librarian") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <rect x="4" y="3" width="6" height="18" />
        <rect x="14" y="3" width="6" height="18" />
      </svg>
    );
  }

  // guest
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
};

const Home = () => {
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  const { products } = useContext(ProductContext);

  const role = !isLoggedIn ? "guest" : currentUser.role;

  const totalBooks = products.length;
  const totalStock = products.reduce((sum, b) => sum + b.stock, 0);
  const lowStock = products.filter((b) => b.stock < 3).length;

  return (
    <div className="page">
      <h2>Library Dashboard</h2>

      {/* ROLE BADGE */}
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <span className={`role-badge ${role}`}>
          <RoleIcon role={role} />
          {role === "guest"
            ? "Guest Mode"
            : role === "admin"
            ? "Admin Mode"
            : "Librarian Mode"}
        </span>
      </div>

      {/* STATS */}
      <div className="dashboard">
        <div className="stat-card">
          <p>Total Books</p>
          <h3>{totalBooks}</h3>
        </div>

        <div className="stat-card">
          <p>Total Stock</p>
          <h3>{totalStock}</h3>
        </div>

        <div className="stat-card danger">
          <p>Low Stock</p>
          <h3>{lowStock}</h3>
        </div>
      </div>

      {/* ACTIONS */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/products" className="btn-link">
          View Books
        </Link>

        {isLoggedIn && role === "admin" && (
          <Link to="/add" className="btn-link" style={{ marginLeft: "10px" }}>
            Add New Book
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
