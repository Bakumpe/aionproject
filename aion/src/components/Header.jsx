import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AionLogo from "../assets/favicon_io/android-chrome-512x512.png";
import "../styles/Header.css";
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
  FanIcon,
  Combine,
  ServerIcon,
  Phone,
  Move,
} from "lucide-react";

const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/loginRegister");
  };

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="nav-wrapper">
          <div className="nav-wrapping">
            <Link to="/" className="logoSpaceLink">
              <div className="logoSpace">
                <img src={AionLogo} alt="Aion Logo" className="logo-image" />
                <span className="logo-text">Aion</span>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <button className="mobile-menu-button" onClick={toggleMenu}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Main Navigation - Desktop */}
          <nav className={`main-nav ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            <Link to="/home" className="nav-link" onClick={closeMobileMenu}>
              <Home className="icon" />
              Home
            </Link>
            <Link to="/eceg" className="nav-link" onClick={closeMobileMenu}>
              <Combine className="icon" />
              Easy Come Easy Go
            </Link>
            <Link to="/myFavorites" className="nav-link" onClick={closeMobileMenu}>
              <FanIcon className="icon" />
              My Favorites
            </Link>
            <Link to="/cars" className="nav-link" onClick={closeMobileMenu}>
              <Car className="icon" />
              Transportation
            </Link>
            <Link to="/ourServices" className="nav-link" onClick={closeMobileMenu}>
              <ServerIcon className="icon" />
              Service Providers
            </Link>
            <Link to="/relocation" className="nav-link" onClick={closeMobileMenu}>
              <Move className="icon" />
              Relocation
            </Link>
            <Link to="/broker" className="nav-link" onClick={closeMobileMenu}>
              <Star className="icon" />
              Register Property
            </Link>
            <Link to="/callCenter" className="nav-link" onClick={closeMobileMenu}>
              <Phone className="icon" />
              Call Center
            </Link>

            <div className={`user-section ${isMobileMenuOpen ? "mobile-open" : ""}`}>
            {user ? (
              <div className="user-menu">
                <div className="user-dropdown">
                  <div className="myProfile">
                    <Link to="/profile" className="dropdown-item" onClick={closeMobileMenu}>
                      <UserCircle className="icon" />
                      {user.username}
                    </Link>
                    <Link to="/settings" className="dropdown-item" onClick={closeMobileMenu}>
                      <Settings className="icon" />
                      Settings
                    </Link>
                  </div>

                  <button onClick={handleLogout} className="logout-button">
                    <LogOut className="icon" />
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/loginRegister" className="auth-button" onClick={closeMobileMenu}>
                Login / Register
              </Link>
            )}
          </div>
          </nav>

          {/* User Menu */}
          
        </div>
      </div>
    </header>
  );
};

export default Header;
