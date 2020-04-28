const { addUser, removeUser, getUser, getUsersInGame } = require('./userController');
const { roomTimer } = require("./roomTimer");

module.exports = (io) => {
    // Set up socket handlers
    io.on('connect', (socket) => {

        socket.on('join', ({ game, name, icon, color }, callback) => {
        console.log(`Socket id on join: ${socket.id}`);
    
        const { error, user } = addUser({ id: socket.id, game, name, icon, color });
    
        if(error) return callback(error);
    
        socket.join(user.game);
    
        io.to(user.game).emit('gameData', { game: user.game, users: getUsersInGame(user.game)});
    
        callback();
        })
    
        socket.on("allHere", ({ game }, callback) => {
        console.log(`Socket id on allHere: ${socket.id}`);
        const user = getUser(socket.id);
    
        io.to(user.game).emit("startGame", { game: user.game, users: getUsersInGame(user.game)});
        })
    
        socket.on('response', async ({ game }, callback) => {
        //get the user from the server based on the socket id
        const user = await getUser(socket.id);
    
        io.to(user.game).emit('respData', {game: user.game});
        })
    
        socket.on("startquestion", async ({ game }, callback) => {
        const user = await getUser(socket.id);
        console.log(`Socket id on startquestion: ${socket.id}`);
        //create a new roomTimer if there isn't already one active
        roomTimer(user.game, "question", io);
        })
    
        socket.on('scoringComplete', async ({ game }, callback) => {
        const user = await getUser(socket.id);
        console.log(`Scoring is complete - socketid: ${socket.id}`)
        //add a pause so they can see their scores
        roomTimer(user.game, "pause", io);
        })
    
        socket.on('disconnect', () => {
        console.log("socket disconnect request received");
        const user = removeUser(socket.id);
    
        if(user){
            io.to(user.game).emit('departure', { user: user.name, text: `${user.name} has left`})
        }
        })
    })  
}