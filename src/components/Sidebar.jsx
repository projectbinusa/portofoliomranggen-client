// src/Sidebar.jsx
import React from "react";
import {
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaEnvelope,
} from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">TICKET</h1>
      </div>
      <nav className="nav-links">
        <ul>
          <li>
            <a href="#">
              <FaHome /> Home
            </a>
          </li>
          <li>
            <a href="#">
              <FaInfoCircle /> About
            </a>
          </li>
          <li>
            <a href="#">
              <FaServicestack /> Services
            </a>
          </li>
          <li>
            <a href="#">
              <FaEnvelope /> Contact
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
