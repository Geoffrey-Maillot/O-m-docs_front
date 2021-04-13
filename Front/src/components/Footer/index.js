import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="footer">
    <div className="footer__content">
      <a href="#">Mention légale</a>
      <Link> Contact </Link>
    </div>
  </footer>
);

export default Footer;
