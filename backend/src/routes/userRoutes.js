const userController = require("../controllers/userController");

const userRoutes = (req, res) => {
  const handleGetRequests = (pathname) => {
    const parts = pathname.split("/");
    const userId = parts[3];

    switch (true) {
      case userId && parts.includes("favorites"):
        userController.getFavoriteCocktailsForUser(req, res);
        break;
      case userId && pathname.startsWith("/api/users/"):
        userController.getUserById(req, res);
        break;
      default:
        userController.getAllUsers(req, res);
    }
  };

  const handlePostRequests = () => {
    userController.addCocktailToFavorites(req, res);
  };

  switch (req.method) {
    case "GET":
      handleGetRequests(req.url);
      break;
    case "POST":
      handlePostRequests(req.url);
      break;
  }
};

module.exports = userRoutes;
