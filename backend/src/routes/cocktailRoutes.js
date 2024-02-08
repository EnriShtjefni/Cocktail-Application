const cocktailController = require("../controllers/cocktailController");

const cocktailRoutes = (req, res) => {
  const parts = req.url.split("/");

  switch (true) {
    case parts.includes("filter"):
      cocktailController.filterCocktailsByCategory(req, res);
      break;
    case parts.includes("random"):
      cocktailController.getRandomCocktail(req, res);
      break;
    case parts.includes("search"):
      cocktailController.searchCocktailsByName(req, res);
      break;
  }
};

module.exports = cocktailRoutes;
