const { NotFoundError, InternalServerError } = require("../customErrors");
const { SearchResultData } = require("../model/searchResultData");
const {
  getAllUsersQuery,
  getUserByIdQuery,
  getFavoriteCocktailsForUserQuery,
  addCocktailToFavoritesQuery,
  checkCocktailExistence,
} = require("../queries");

function handleCustomError(res, error) {
  if (error instanceof NotFoundError) {
    res.writeHead(error.status, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ error: error.message }));
  } else if (error instanceof InternalServerError) {
    res.writeHead(error.status, {
      "Content-Type": "application/json",
    });
    res.end(JSON.stringify({ error: error.message }));
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await getAllUsersQuery();
    const searchResult = new SearchResultData(users, users.length);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(searchResult));
  } catch (error) {
    const internalServerError = new InternalServerError(
      "Failed getting all users"
    );
    handleCustomError(res, internalServerError);
  }
}

async function getUserById(req, res) {
  const userId = parseInt(req.url.split("/").pop(), 10);
  if (isNaN(userId)) {
    const notFoundError = new NotFoundError("User not found");
    handleCustomError(res, notFoundError);
    return;
  }
  try {
    const user = await getUserByIdQuery(userId);
    if (user) {
      const searchResult = new SearchResultData([user], 1);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(searchResult));
    } else {
      const notFoundError = new NotFoundError("User not found");
      handleCustomError(res, notFoundError);
    }
  } catch (error) {
    const internalServerError = new InternalServerError(
      "Failed getting user by Id"
    );
    handleCustomError(res, internalServerError);
  }
}

async function getFavoriteCocktailsForUser(req, res) {
  const userId = req.url.split("/")[3];
  try {
    const favoriteCocktails = await getFavoriteCocktailsForUserQuery(userId);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(favoriteCocktails));
  } catch (error) {
    const internalServerError = new InternalServerError(
      "Failed getting favorite cocktails for user"
    );
    handleCustomError(res, internalServerError);
  }
}

async function addCocktailToFavorites(req, res) {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", async () => {
    try {
      const userId = parseInt(req.url.split("/")[3]);
      const cocktail = JSON.parse(body);
      const cocktailExists = await checkCocktailExistence(cocktail.cocktailId);
      if (!cocktailExists) {
        await addCocktailToFavoritesQuery(userId, cocktail);
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Cocktail marked as favorite successfully!");
    } catch (error) {
      const internalServerError = new InternalServerError(
        "Failed marking cocktail as favorite"
      );
      handleCustomError(res, internalServerError);
    }
  });
}

module.exports = {
  getAllUsers,
  getUserById,
  getFavoriteCocktailsForUser,
  addCocktailToFavorites,
};
