import React from 'react';
import { Instagram, Facebook, Twitter } from '@mui/icons-material';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer-container'>
      <p>&copy; 2024 Cocktail-App. All rights reserved.</p>
      <div className="social-icons">
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Instagram />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Facebook />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <Twitter />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
