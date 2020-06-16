const { addUserSocket, removeUser } = require('./userController');
const db = require('../models');

module.exports = (io) => {
    // Set up socket handlers
    io.on('connect', (socket) => {

        socket.on('join', async ({ game, name }, callback) => {
            console.log(`Socket id on join: ${socket.id}`);
            //creates a record of which socket belongs to this user
            const { error, user } = await addUserSocket({ id: socket.id, game, name })
            //throws error if someone in the game
            //is already using this name
            if(error) {
                return callback(error);
            } else {
                //registers the socket to a specific game
                socket.join(game);
                //emits an event telling the client to get all 
                //users in the game
                io.to(game).emit('gameData');
                return callback(user);
            }
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