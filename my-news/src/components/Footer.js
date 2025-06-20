import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div>© 2025 RickNews. All rights reserved.</div>
      <div>
        <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a> |{" "}
        <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a> |{" "}
        <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
