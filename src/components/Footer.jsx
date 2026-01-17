import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-4">
      <p className="mb-0">&copy; 2025 Fake Store. All rights reserved.</p>
      <ul className="list-unstyled d-flex justify-content-center mb-0">
        <li className="mx-3">
          <Link to="/" className="text-white text-decoration-none">
            Home
          </Link>
        </li>
        <li className="mx-3">
          <Link to="/products" className="text-white text-decoration-none">
            Products
          </Link>
        </li>
        <li className="mx-3">
          <Link to="/about" className="text-white text-decoration-none">
            About
          </Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
