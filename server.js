const express = require("express");
const socketio = require("socket.io");
const http = require('http');
const cors = require('cors');
const passport = require('passport');
require("dotenv");

const { addUser, removeUser, getUser, getUsersInGame, addResponses, getResponses } = require('./controllers/userController');
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

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Set up socket handlers
io.on('connect', (socket) => {

  socket.on('join', ({ game, name, icon, color }, callback) => {
    console.log(`Socket id on join: ${socket.id}`);

    const { error, user } = addUser({ id: socket.id, game, name, icon, color });

    if(error) return callback(error);

    socket.join(user.game);

    //socket.emit('arrival', { user });
    //socket.broadcast.to(user.game).emit('arrival', { user });

    io.to(user.game).emit('gameData', { game: user.game, users: getUsersInGame(user.game)});

    callback();
  })

  socket.on("allHere", ({ game }, callback) => {
    console.log(`Socket id on allHere: ${socket.id}`);
    const user = getUser(socket.id);

    io.to(user.game).emit("startGame", { game: user.game, users: getUsersInGame(user.game)});
  })

  socket.on('response', ({ game, name, q, resp }, callback) => {
    console.log(`Socket id on response: ${socket.id}`);
    console.log(`Data received: ${game}, ${name}, ${q}, ${resp}`);

    const { error, user } = addResponses({ id: socket.id, game, name, q, resp });

    console.log(getResponses(user.game));

    if(error) return callback(error);

    io.to(user.game).emit('respData', {game: user.game, users: getResponses(user.game)});
    
    callback(getResponses(user.game));
  })

  socket.on('disconnect', () => {
    console.log("socket disconnect request received");
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

