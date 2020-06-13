const { addUser, removeUser, getUser, getUsersInGame } = require('./userController');
const { getQuizId } = require('./gameController')
const { roomTimer } = require("./roomTimer");
const db = require('../models');

module.exports = (io) => {
    // Set up socket handlers
    io.on('connect', (socket) => {

        socket.on('join', async ({ game, userId, name, icon, color }, callback) => {
            console.log(`Socket id on join: ${socket.id}`);
            //creates a record of which socket belongs to this user
            const { error, user } = await addUser({ id: socket.id, game, userId, name, icon, color })
            //throws error if someone in the game
            //is already using this name
            if(error) return callback(error);
            //registers the socket to a specific game
            socket.join(game);
            //emits an event telling the client to get all 
            //users in the game
            io.to(game).emit('gameData');
            
        })
    
        socket.on("startquestion", async ({ game }, callback) => {
        const user = await getUser(socket.id);
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