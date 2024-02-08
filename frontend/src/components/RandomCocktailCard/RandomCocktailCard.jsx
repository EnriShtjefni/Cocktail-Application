import React, { useEffect, useState } from "react";
import "./RandomCocktailCard.css";
import CocktailCard from "../CocktailCard/CocktailCard";
import { fetchRandomCocktail, addFavorite } from "../../api";

const RandomCocktailCard = () => {
  const [randomCocktail, setRandomCocktail] = useState(null);
  const [favoriteCocktail, setFavoriteCocktail] = useState(null);

  const getUserIdFromLocalStorage = () => {
    return localStorage.getItem("selectedUserId");
  };

  useEffect(() => {
    const fetchRandomCocktailData = async () => {
      const data = await fetchRandomCocktail();
      setRandomCocktail(data);
    };

    fetchRandomCocktailData();
  }, []);

  const handleAddFavorite = async () => {
    try {
      const data = await addFavorite(randomCocktail);
      setFavoriteCocktail(data);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  return (
    <div>
      <h2 className="homepage-title-random">Cocktail of the day</h2>
      {randomCocktail && (
        <CocktailCard
          cocktail={randomCocktail}
          handleAddFavorite={handleAddFavorite}
          index={0}
          showStarButton={true}
        />
      )}
    </div>
  );
};

export default RandomCocktailCard;
