import React from "react";
import { Link, useLocation } from "react-router-dom";
import './Navbar.css';

const categories = [
  { name: "General", path: "/" },
  { name: "Business", path: "/business" },
  { name: "Entertainment", path: "/entertainment" },
  { name: "Sports", path: "/sports" },
  { name: "Technology", path: "/technology" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="sidebar">
      <div className="brand">
        <Link to="/" className="brand-link">RickNews</Link>
      </div>
      <ul className="nav-links">
        {categories.map((cat) => (
          <li key={cat.name} className={location.pathname === cat.path ? "active" : ""}>
            <Link to={cat.path} className="nav-link">{cat.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
