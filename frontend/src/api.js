const apiUrl = "http://localhost:3001/api";

export const fetchUserData = async () => {
  try {
    const response = await fetch(`${apiUrl}/users`);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const fetchUserDataById = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/users/${userId}`);
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const fetchUserFavorites = async (userId) => {
  try {
    const response = await fetch(`${apiUrl}/users/${userId}/favorites`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user favorites:", error);
    throw error;
  }
};

export const searchCocktails = async (searchTerm) => {
  try {
    const response = await fetch(`${apiUrl}/cocktails/search/${searchTerm}`);
    const data = await response.json();
    const cocktails = data.result || [];
    return cocktails;
  } catch (error) {
    console.error("Error searching cocktails:", error);
    throw error;
  }
};

export const filterCocktailsByCategory = async (category) => {
  try {
    const response = await fetch(
      `${apiUrl}/cocktails/filter/${encodeURIComponent(category)}`
    );
    const data = await response.json();
    const cocktails = data.result || [];
    return cocktails;
  } catch (error) {
    console.error("Error filtering cocktails:", error);
    throw error;
  }
};

export const fetchRandomCocktail = async () => {
  try {
    const response = await fetch(`${apiUrl}/cocktails/random`);
    const data = await response.json();
    return data.result[0];
  } catch (error) {
    console.error("Error fetching random cocktail:", error);
    throw error;
  }
};

const getUserIdFromLocalStorage = () => {
  return localStorage.getItem("selectedUserId");
};

export const addFavorite = async (cocktail) => {
  const requestOptions = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      cocktailId: cocktail.idDrink,
      cocktailName: cocktail.strDrink,
      cocktailCategory: cocktail.strCategory,
      cocktailAlcoholic: cocktail.strAlcoholic,
      cocktailGlass: cocktail.strGlass,
      cocktailPhotoLink: cocktail.strDrinkThumb,
    }),
  };

  try {
    const response = await fetch(
      `${apiUrl}/users/${getUserIdFromLocalStorage()}/favorites`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};
