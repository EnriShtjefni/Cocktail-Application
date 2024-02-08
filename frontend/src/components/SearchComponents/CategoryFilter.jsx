import React from 'react';
import { Select, MenuItem } from '@mui/material';

/**
 * @param {Object} props - The properties of the component.
 * @param {string} props.selectedCategory - The currently selected category.
 * @param {Function} props.handleFilter - The function to handle category selection change.
 */
const CategoryFilter = ({ selectedCategory, handleFilter }) => {
  return (
    <Select value={selectedCategory} onChange={handleFilter} displayEmpty>
      <MenuItem value="">Select a category</MenuItem>
      <MenuItem value="Ordinary_Drink">Ordinary Drink</MenuItem>
      <MenuItem value="Cocktail">Cocktail</MenuItem>
      <MenuItem value="Shot">Shot</MenuItem>
      <MenuItem value="Coffee_/_Tea">Coffee / Tea</MenuItem>
      <MenuItem value="Punch_/_Party_Drink">Punch / Party Drink</MenuItem>
      <MenuItem value="Soft_Drink">Soft Drink</MenuItem>
      <MenuItem value="Beer">Beer</MenuItem>
      <MenuItem value="Shake">Shake</MenuItem>
      <MenuItem value="Other_/_Unknown">Other / Unknown</MenuItem>
    </Select>
  );
};

export default CategoryFilter;
