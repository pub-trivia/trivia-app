const { addUser, removeUser } = require('./userController');
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
    
        socket.on('disconnect', () => {
        console.log("socket disconnect request received");
        const user = removeUser(socket.id);
    
        if(user){
            io.to(user.game).emit('departure', { user: user.name, text: `${user.name} has left`})
        }
        })
    })  
}