const express = require("express");
var session = require("express-session");
const socketio = require("socket.io");
const http = require('http');
const cors = require('cors');
const passport = require("./config/passport");
require("dotenv");

const { addUser, removeUser, getUser, getUsersInGame } = require('./controllers/userController');
const db = require("./models");
const router = require("./routes/html-routes");

const path = require("path");
const PORT = process.env.PORT || 3001;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Routes
// =============================================================
app.use(cors());
require("./routes/api-routes.js")(app);
app.use(router);


// Set up socket handlers
io.on('connect', (socket) => {

  socket.on('join', ({ game, name, icon, color }, callback) => {
    
    const { error, user } = addUser({ id: socket.id, game, name, icon, color });

    if(error) return callback(error);

    socket.join(user.game);

    //socket.emit('arrival', { user });
    //socket.broadcast.to(user.game).emit('arrival', { user });

    io.to(user.game).emit('gameData', { game: user.game, users: getUsersInGame(user.game)});

    callback();
  })

  socket.on("allHere", ({ game }, callback) => {
    const user = getUser(socket.id);

    io.to(user.game).emit("startGame", { game: user.game, users: getUsersInGame(user.game)});
  })

  socket.on('gameResponse', (response, callback) => {
    const user = getUser(socket.id);

    io.to(user.game).emit('response', {user: user.name, response: response});
    io.to(user.game).emit('gameData', {game: user.game, users: getUsersInGame(user.game)});

    callback();
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user){
      io.to(user.game).emit('departure', { user: user.name, text: `${user.name} has left`})
    }
  })
})

//sync the db with sequelize
db.sequelize.sync().then(function () {
//and if successful, start the app!
  server.listen(PORT, function () {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});

