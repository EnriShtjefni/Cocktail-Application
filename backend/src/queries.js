const { pool } = require("./config/db");

async function getAllUsersQuery() {
  const query = "SELECT * FROM users";
  const result = await pool.query(query);
  return result.rows;
}

async function getUserByIdQuery(userId) {
  const query = "SELECT * FROM users WHERE userId = $1";
  const result = await pool.query(query, [userId]);
  return result.rows.length > 0 ? result.rows[0] : null;
}

async function getFavoriteCocktailsForUserQuery(userId) {
  const query = `
        SELECT u.userId, fc.cocktailId, fc.cocktailName, fc.cocktailCategory, fc.cocktailAlcoholic, fc.cocktailGlass, fc.cocktailPhotoLink
        FROM users u
        JOIN user_favorite_cocktails ufc ON u.userId = ufc.userId
        JOIN favorite_cocktails fc ON ufc.cocktailId = fc.cocktailId
        WHERE u.userId = $1;`;
  const result = await pool.query(query, [userId]);
  return result.rows;
}

async function checkCocktailExistence(cocktailId) {
  const query = "SELECT * FROM favorite_cocktails WHERE cocktailId = $1";
  const result = await pool.query(query, [cocktailId]);
  return result.rowCount > 0;
}

async function addCocktailToFavoritesQuery(userId, cocktail) {
  const {
    cocktailId,
    cocktailName,
    cocktailCategory,
    cocktailAlcoholic,
    cocktailGlass,
    cocktailPhotoLink,
  } = cocktail;
  const addCocktailQuery =
    "INSERT INTO favorite_cocktails (cocktailId, cocktailName, cocktailCategory, cocktailAlcoholic, cocktailGlass, cocktailPhotoLink) VALUES ($1, $2, $3, $4, $5, $6)";
  await pool.query(addCocktailQuery, [
    cocktailId,
    cocktailName,
    cocktailCategory,
    cocktailAlcoholic,
    cocktailGlass,
    cocktailPhotoLink,
  ]);
  const associateQuery =
    "INSERT INTO user_favorite_cocktails (userId, cocktailId) VALUES ($1, $2)";
  await pool.query(associateQuery, [userId, cocktailId]);
}

module.exports = {
  getAllUsersQuery,
  getUserByIdQuery,
  getFavoriteCocktailsForUserQuery,
  addCocktailToFavoritesQuery,
  checkCocktailExistence,
};
