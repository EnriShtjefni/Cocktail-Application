import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchUserDataById, fetchUserFavorites } from "../../api";
import { Avatar, Grid, Button } from "@mui/material";
import "./UserProfilePage.css";
import CocktailCard from "../CocktailCard/CocktailCard";
 
const UserProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [favoriteCocktails, setFavoriteCocktails] = useState([]);
 
  useEffect(() => {
    const fetchUser = async () => {
 
        const userData = await fetchUserDataById(userId);
        if (userData.length > 0) {
          setUser(userData[0]);
          const favoriteCocktailsData = await fetchUserFavorites(userId);
          setFavoriteCocktails(favoriteCocktailsData);
        }
      };
    fetchUser();
  }, [userId]);
 
  const getUserIdFromLocalStorage = () => {
    return localStorage.getItem("selectedUserId");
  };
 
  return (
    <div className="home-page-container">
      <Button
        component={Link}
        to={`/home/${getUserIdFromLocalStorage()}`}
        className="back-button"
        variant="contained"
        sx={{
          "display": "flex",
          "alignSelf": "start",
          "backgroundColor": "#BCA853",
          "&:hover": {
            backgroundColor: "#506917",
          },
        }}
      >
        Back
      </Button>
      <div className="user-info-container">
        {user && (
          <>
            <p className="user-info-title">
              You have selected user {user.userid}!
            </p>
            <div className="user-details">
              <p className="user-username">User: {user.username}</p>
              <Avatar
                src={user.avatarlogolink}
                alt={user.username}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  marginTop: 5,
                  border: "3px solid black",
                }}
              />
            </div>
          </>
        )}
      </div>
      {favoriteCocktails.length > 0 && (
        <div className="favorite-cocktails">
          <h2 className="favourite-cocktail-title">
            {user.username}'s Favorite Cocktails:
          </h2>
          <Grid container spacing={3} justifyContent="center">
            {favoriteCocktails.map((cocktail) => (
              <Grid item key={cocktail.cocktailid} justifyContent="center">
                <CocktailCard
                  cocktail={{
                    idDrink: cocktail.cocktailid,
                    strDrink: cocktail.cocktailname,
                    strDrinkThumb: cocktail.cocktailphotolink,
                    strCategory: cocktail.cocktailcategory,
                    strAlcoholic: cocktail.cocktailalcoholic,
                    strGlass: cocktail.cocktailglass,
                  }}
                  showStarButton={false}
                  handleAddFavorite={() => {}}
                  index={0}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
};
 
export default UserProfilePage;