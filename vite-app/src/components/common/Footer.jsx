const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left side: subtitle */}
        <p className="footer-sub">
          Frontend Frameworks Project built using React
        </p>

        {/* Right side: features */}
        <ul className="footer-links">
          <li>Book Inventory</li>
          <span>|</span>
          <li>User Role Management</li>
          <span>|</span>
          <li>Stock Control</li>
          <span>|</span>
          <li>Admin Access</li>
        </ul>
      </div>

      <div className="footer-bottom">
        © 2025 Library Inventory Management System
      </div>
    </footer>
  );
};

export default Footer;
