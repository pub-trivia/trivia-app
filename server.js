const express = require("express");
const socketio = require("socket.io");
const http = require('http');
const cors = require('cors');
const passport = require('passport');
require("dotenv");

const db = require("./models");

const path = require("path");
const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());

require('./config/passport')(passport);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

// Routes
// =============================================================
app.use(cors());
require("./routes/api-routes.js")(app);
require("./routes/auth-routes.js")(app);
require("./routes/game-routes.js")(app, io);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

require("./controllers/sockets.js")(io);

//sync the db with sequelize
db.sequelize.sync().then(function () {
//and if successful, start the app!
  server.listen(PORT, function () {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});

