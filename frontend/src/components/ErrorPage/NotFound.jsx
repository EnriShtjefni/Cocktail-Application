import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import './ErrorPages.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Button component={Link} to="/" className="back-button" variant="contained" sx={{ backgroundColor: '#BCA853', '&:hover': { backgroundColor: '#506917' } }}>
        Back
      </Button>
    </div>
  );
};

export default NotFound;