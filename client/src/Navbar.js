import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import QuoteApi from "./components/QuoteApi.js";
import CreateShipment_Api from "./components/CreateShipment_Api";
import TrackingApi from "./components/TrackingApi";
import CancelOrderApi from "./components/CancelOrderApi";
import "./Navbar.css";

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleNav = () => {
    setIsActive(!isActive);
  };

  return (
    <Router>
      <nav className={`navbar ${isActive ? "active" : ""}`}>
        <div className="container">
          <Link to="/" className="logo">
            Shipment Tracking
          </Link>
          <button className="menu-icon" onClick={toggleNav}>
            <i className={isActive ? "fas fa-times" : "fas fa-bars"}></i>
          </button>
          <ul className={`nav-links ${isActive ? "active" : ""}`}>
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Get Quote
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create-shipment" className="nav-link">
                Create Shipment
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tracking" className="nav-link">
                Track Shipment
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cancel-order" className="nav-link">
                Cancel Order
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<QuoteApi />} />

        <Route path="/create-shipment" element={<CreateShipment_Api />} />
        <Route path="/tracking" element={<TrackingApi />} />
        <Route path="/cancel-order" element={<CancelOrderApi />} />
      </Routes>
    </Router>
  );
}

export default Navbar;
