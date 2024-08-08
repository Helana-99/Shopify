import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import "./navbar.css";
import image from "../../assets/2424103.png";

export default function Navbar() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className={`navbar navbar-expand-lg ${theme}-theme`}>
    <div className="container d-flex justify-content-between">
      <div className="d-flex align-items-center">
        <Link to="/" className="navbar-brand">
          SHOPIFY
          <img src={image} alt="Shopify Icon" className="navbar-icon" />
        </Link>
      </div>
        <div className="navbar-collapse d-flex justify-content-end">
          <ul className="navbar-nav d-flex">
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link position-relative">
                <i className="fa-solid fa-cart-shopping">
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">
                    {totalQuantity}
                  </span>
                </i>
              </Link>
            </li>
            <li className="nav-item">
              <button onClick={toggleTheme} className="btn nav-link">
                <i className={`fa ${theme === 'light' ? 'fa-sun' : 'fa-moon'}`}></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
