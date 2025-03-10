require("dotenv").config({ path: "./.env" });
const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const port = process.env.PORT || 4000;
const dbUrl = process.env.DB_URL;
const dbConnection = require("./database");

// * database connection
(async () => {
  try {
    await dbConnection(dbUrl);
    console.log("database is connected");
    server.listen(port, () => {
      console.log(`server is running at port : ${port}`);
    });
  } catch (error) {
    console.log("failed to start the server", error);
    process.exit(1);
  }
})();
