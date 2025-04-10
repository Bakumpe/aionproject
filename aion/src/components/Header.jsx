import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AionLogo from "../assets/favicon_io/android-chrome-512x512.png";
import { UserContext } from "../context/UserContext";
import {
  Home,
  UserCircle,
  Settings,
  LogOut,
  Building,
  Star,
  Menu,
  X,
  Car,
  Combine,
  ServerIcon,
  Phone,
  Move,
  MessageCircle,
} from "lucide-react";

const Header = () => {
  const { user, logout } = useContext(UserContext); // Added logout from UserContext
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout(); // Call UserContext logout to clear cookie and state
    navigate("/loginRegister", { replace: true }); // Navigate to login page
    setIsMobileMenuOpen(false); // Close mobile menu on logout
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="nav-wrapping">
        <Link to="/" className="logoSpaceLink">
          <div className="logoSpace">
            <img src={AionLogo} alt="Aion Logo" className="logo-image" />
            <p className="logo-text">Aion</p>
          </div>
        </Link>
        {/* Mobile Menu Button */}
        <div className="mobile-menu-button">
          <button onClick={toggleMenu} aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Main Navigation - Desktop */}
      <nav className={`main-nav ${isMobileMenuOpen ? "mobile-open" : ""}`}>
        <Link to="/home" className="nav-link" onClick={closeMobileMenu}>
          <Home className="icon" />
          Find Property
        </Link>
        <Link to="/cars" className="nav-link" onClick={closeMobileMenu}>
          <Car className="icon" />
          Find Cars
        </Link>
        <Link to="/eceg" className="nav-link" onClick={closeMobileMenu}>
          <Combine className="icon" />
          Find Ezy Stay
        </Link>
        <Link to="/services" className="nav-link" onClick={closeMobileMenu}>
          <ServerIcon className="icon" />
          Find Service
        </Link>
        <Link to="/relocation" className="nav-link" onClick={closeMobileMenu}>
          <Move className="icon" />
          Relocation
        </Link>
        <Link to="/broker" className="nav-link" onClick={closeMobileMenu}>
          <Star className="icon" />
          Register Property
        </Link>
        <Link
          to="/profile"
          state={{ activeSection: "Notifications" }}
          className="nav-link"
          onClick={closeMobileMenu}
        >
          <MessageCircle className="icon" />
          Notifications
        </Link>
        <Link to="/callCenter" className="nav-link" onClick={closeMobileMenu}>
          <Phone className="icon" />
          Customer Support
        </Link>

        <div className={`user-section ${isMobileMenuOpen ? "mobile-open" : ""}`}>
          {user ? (
            <div className="user-menu">
              <div className="myProfile">
                <Link to="/profile" className="nav-link" onClick={closeMobileMenu}>
                  <UserCircle className="icon" />
                  {user.username}
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="logout-button"
                aria-label="Log out"
              >
                <LogOut className="icon" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/loginRegister"
              className="login-button"
              onClick={closeMobileMenu}
            >
              Login / Register
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;