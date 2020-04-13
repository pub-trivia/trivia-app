const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const db = require("./models");


// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build"));
  });
  // } else {
  //   app.use(express.static("client/public"));
  //   app.get("*", function (req, res) {
  //     res.sendFile(path.join(__dirname, "./client/public"));
  //   });
}

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
// =============================================================
require("./routes/api-routes.js")(app);

// Send every request to the React app
// Define any API routes before this runs

db.sequelize.sync().then(function () {

  app.listen(PORT, function () {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});

