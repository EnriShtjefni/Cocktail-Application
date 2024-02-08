import React from "react";
import CocktailCard from "../CocktailCard/CocktailCard";
import "./SearchResultContainer.css";
import { useState } from "react";
import { addFavorite } from "../../api";

/**
 * @param {Object} props - The properties of the component.
 * @param {string} props.title - The title of the search results container.
 * @param {Array} props.results - The array of search results to be displayed.
 * @param {React.MutableRefObject} props.scrollRef - The reference used for scrolling.
 */

const SearchResultsContainer = ({ title, results, scrollRef }) => {
  const [visibleResults, setVisibleResults] = useState(8);
  const [favoriteCocktail, setFavoriteCocktail] = useState(null);

  const handleAddFavorite = async (cocktail) => {
    try {
      const data = await addFavorite(cocktail);
      setFavoriteCocktail(data);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const handleLoadMore = () => {
    setVisibleResults((prevVisibleResults) => prevVisibleResults + 8);
  };

  return (
    <div className="search-results-container" ref={scrollRef}>
      <h3 className="results-title">{title}</h3>
      <div className="search-cards-container">
        {results.slice(0, visibleResults).map((cocktail, index) => (
          <CocktailCard
            key={cocktail.idDrink}
            cocktail={cocktail}
            handleAddFavorite={handleAddFavorite}
            index={index}
            showStarButton={true}
          />
        ))}
      </div>
      {results.length > visibleResults && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default SearchResultsContainer;
