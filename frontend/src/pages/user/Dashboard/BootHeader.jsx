import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons CSS

const UserHeader = () => {
  // State to manage mobile menu toggle
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to handle mobile menu toggle
  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          <i className="bi bi-house-door"></i> MyApp
        </Link>

        {/* Toggle Button for Mobile Menu */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
          onClick={handleMenuToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div
          className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {/* Profile Link */}
            <li className="nav-item">
              <Link className="nav-link" to="/user-dashboard/my-profile">
                <i className="bi bi-person-fill"></i> Profile
              </Link>
            </li>

            {/* Form Completion Link */}
            <li className="nav-item">
              <Link className="nav-link" to="/user-dashboard/userdocuments">
                <i className="bi bi-file-earmark-text"></i> Form
              </Link>
            </li>

            {/* Documents Upload Link */}
            <li className="nav-item">
              <Link className="nav-link" to="/user-dashboard/userdocumentsupload">
                <i className="bi bi-upload"></i> Documents
              </Link>
            </li>

            {/* Payment Link */}
            <li className="nav-item">
              <Link className="nav-link" to="/user-dashboard/payment">
                <i className="bi bi-credit-card"></i> Payment
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
