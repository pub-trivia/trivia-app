const users = [];
const responses = [];

const addUser = ({ id, game, name, icon, color }) => {
    name = name.trim().toLowerCase();
    game = game.trim().toLowerCase();

    const existingUser = users.find((user) => user.game === game && user.name === name);

    if(existingUser){
        return { error: 'That username is already taken!'}
    }

    const user = { id, game, name, icon, color };

    users.push(user);

    return { user };
}

const removeUser = (id) => {

    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

//TODO: this should send this data to the db
const addResponses = ({ id, game, name, icon, color, q, resp }) => {
    //TODO: console log the data we now have for the user
    console.log(`adding response: ${game}, ${name}, ${icon}, ${color}, ${q}, ${resp}`);
    
    const user = { id, game, name, icon, color, q, resp };
    responses.push(user);
    
    //TODO: only save the last response for a user
    // const existingResp = users.find((user) => user.game === game && user.name === name && user.q === q)
    
    //TODO: this isn't working yet (may handle it on the front end instead)
    // if(existingResp){
    //     console.log("User has an existing response: ")
    //     console.log(existingResp);
    // } else {
    //     responses.push(user);
    // }
    
    return { user };
}

const getUser = (id) => users.find((user) => user.id === id);

//TODO: this should retrieve this info from the db
const getResponses = (game) => {
    console.log("==========value of responses =====")
    return responses.filter((user) => user.game === game);
}

//TODO: this should retrieve this info from the db
const getUsersInGame = (game) => users.filter((user) => user.game === game);

module.exports = { addUser, removeUser, getUser, getUsersInGame, addResponses, getResponses }