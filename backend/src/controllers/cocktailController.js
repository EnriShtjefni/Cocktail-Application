const axios = require("axios");
const { NotFoundError, InternalServerError } = require("../customErrors");
const { SearchResultData } = require("../model/searchResultData");

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

function searchCocktailsByName(req, res) {
  const name = req.url.split("/").pop();

  if (!name) {
    const notFoundError = new NotFoundError("Missing name parameter");
    handleCustomError(res, notFoundError);
    return;
  }

  axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then((response) => {
      const searchData = new SearchResultData(
        response.data.drinks,
        response.data.drinks.length
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(searchData));
    })
    .catch((error) => {
      const internalServerError = new InternalServerError(
        "Error searching cocktails"
      );
      handleCustomError(res, internalServerError);
    });
}

function getRandomCocktail(req, res) {
  axios
    .get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((response) => {
      const searchData = new SearchResultData(
        response.data.drinks,
        response.data.drinks.length
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(searchData));
    })
    .catch((error) => {
      const internalServerError = new InternalServerError(
        "Error fetching random cocktail"
      );
      handleCustomError(res, internalServerError);
    });
}

function filterCocktailsByCategory(req, res) {
  const category = req.url.split("/").pop();

  if (!category) {
    const notFoundError = new NotFoundError("Missing name parameter");
    handleCustomError(res, notFoundError);
    return;
  }

  axios
    .get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => {
      const searchData = new SearchResultData(
        response.data.drinks,
        response.data.drinks.length
      );
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(searchData));
    })
    .catch((error) => {
      const internalServerError = new InternalServerError(
        "Error filtering cocktails by category"
      );
      handleCustomError(res, internalServerError);
    });
}

module.exports = {
  searchCocktailsByName,
  getRandomCocktail,
  filterCocktailsByCategory,
};
