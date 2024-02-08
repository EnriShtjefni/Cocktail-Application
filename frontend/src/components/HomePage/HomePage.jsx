import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@mui/material';
import RandomCocktailCard from '../RandomCocktailCard/RandomCocktailCard';
import SearchBar from '../SearchComponents/SearchBar';
import CategoryFilter from '../SearchComponents/CategoryFilter';
import SearchResultsContainer from '../SearchResults/SearchResultsContainer';
import { fetchUserDataById, searchCocktails, filterCocktailsByCategory } from '../../api';
import './HomePage.css';

const HomePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const searchResultsRef = useRef(null);
  const filterResultsRef = useRef(null);
  const searchFilterRef = useRef(null);

  useEffect(() => {
        const fetchData = async () => {
        const data = await fetchUserDataById(userId);
        setUser(data);
    };

    fetchData();
  }, [userId]);

      const handleSearch = async () => {
      const cocktails = await searchCocktails(searchTerm);
      setSearchResults(cocktails);
      setTimeout(() => {
        searchResultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 50);
  };

      const handleFilter = async (event) => {
      const category = event.target.value;
      setSelectedCategory(category);

      const cocktails = await filterCocktailsByCategory(category);
      setCategories(cocktails);
      setTimeout(() => {
        filterResultsRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 50);
  };

  const handleScrollToSearch = () => {
    if (searchResultsRef.current || filterResultsRef.current) {
      searchFilterRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page-container">
      <Button
        component={Link}
        to="/"
        className="back-button"
        variant="contained"
        sx={{
          "display": "flex",
          "alignSelf": "start",
          "backgroundColor": "#BCA853",
          "&:hover": { backgroundColor: "#506917" },
        }}
      >
        Back
      </Button>

      <RandomCocktailCard />

      <div className='search-filter' ref={searchFilterRef}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
        <CategoryFilter selectedCategory={selectedCategory} handleFilter={handleFilter} />
      </div>

      {searchResults.length > 0 && (<SearchResultsContainer
        title="Search Results:"
        results={searchResults}
        scrollRef={searchResultsRef}
      />
      )}

      {categories.length > 0 && (<SearchResultsContainer
        title="Filtered Results:"
        results={categories}
        scrollRef={filterResultsRef}
      />
      )}

      <Button
        onClick={handleScrollToSearch}
        variant="contained"
        sx={{ backgroundColor: '#0a8191', '&:hover': { backgroundColor: '#155980' } }}
        style={{
          position: 'fixed',
          bottom: 120,
          right: 16,
          display: searchResults.length > 0 || categories.length > 0 ? 'block' : 'none',
        }}
      >
        Scroll to Searchbar
      </Button>
    </div>
  );
};

export default HomePage;
