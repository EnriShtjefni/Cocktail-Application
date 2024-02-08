import React, { useState } from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import "./CocktailCard.css";

/**
 * @typedef {Object} Cocktail
 * @property {string} idDrink - The ID of the cocktail.
 * @property {string} strDrink - The name of the cocktail.
 * @property {string} strDrinkThumb - The URL of the cocktail image.
 * @property {string} [strCategory] - The category of the cocktail (optional).
 * @property {string} [strAlcoholic] - The alcoholic content of the cocktail (optional).
 * @property {string} [strGlass] - The type of glass used for the cocktail (optional).
 */

/**
 * @param {Object} props - The properties of the component.
 * @param {Cocktail} props.cocktail - The cocktail object with details.
 * @param {Function} [props.handleAddFavorite] - The function to add the cocktail to favorites.
 * @param {number} [props.index] - The index of the cocktail in the list.
 * @param {boolean} [props.showStarButton] - Indicates whether to show the favorite star button.
 */
const CocktailCard = ({cocktail, handleAddFavorite, index, showStarButton }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleFavoriteClick = () => {
    setIsClicked(!isClicked);
    handleAddFavorite(cocktail, index);
  };

  const getButtonStyle = (isClicked) => {
    return {
      color: isClicked ? "orange" : "grey",
    };
  };

  return (
    <Card key={cocktail.idDrink} className="card-container-cocktail">
      <CardContent className="card-content-cocktail">
        <Typography variant="h5" component="div">
          {cocktail.strDrink}
        </Typography>
        <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
        {cocktail.strCategory && (
          <Typography color="text.secondary">
            Category: {cocktail.strCategory}
          </Typography>
        )}

        {cocktail.strAlcoholic && (
          <Typography color="text.secondary">
            Alcoholic: {cocktail.strAlcoholic}
          </Typography>
        )}

        {cocktail.strGlass && (
          <Typography color="text.secondary">
            Glass: {cocktail.strGlass}
          </Typography>
        )}
        {showStarButton && (
          <IconButton onClick={handleFavoriteClick}>
            <StarIcon style={getButtonStyle(isClicked)} />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

export default CocktailCard;
