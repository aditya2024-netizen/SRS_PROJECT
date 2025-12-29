import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";

const Navbar = () => {
  const { isLoggedIn, logout, currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
    }
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/" className="brand">
          Library Inventory Management System
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/products" className="nav-item">
          Books
        </Link>

        {isLoggedIn ? (
          <>
            {currentUser?.role === "admin" && (
              <Link to="/add" className="nav-item">
                Add Book
              </Link>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="nav-item nav-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-item">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
