const http = require("http");
const userRoutes = require("./routes/userRoutes");
const cocktailRoutes = require("./routes/cocktailRoutes");
require("dotenv").config();

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST", "OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.url.startsWith("/api/users")) {
    userRoutes(req, res);
    return;
  }

  if (req.url.startsWith("/api/cocktails")) {
    cocktailRoutes(req, res);
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
