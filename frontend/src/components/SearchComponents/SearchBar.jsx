import React from 'react';
import { TextField, Button } from '@mui/material';
import "./SearchBar.css";

/**
 * @param {Object} props - The properties of the component.
 * @param {string} props.searchTerm - The current value of the search term.
 * @param {Function} props.setSearchTerm - The function to update the search term.
 * @param {Function} props.handleSearch - The function to handle the search action.
 */
const SearchBar = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <div className="search-bar-container">
      <TextField
        label="Search by cocktail name"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        onClick={handleSearch}
        variant="contained"
        sx={{ backgroundColor: '#BCA853', '&:hover': { backgroundColor: '#506917' } }}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
