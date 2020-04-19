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

const addResponses = ({ id, game, name, icon, color }) => {
    const user = { id, game, name, icon, color };
    responses.push(user);

    return { user };
}

const getUser = (id) => users.find((user) => user.id === id);

const getResponses = (game) => responses.filter((user) => user.game === game);

const getUsersInGame = (game) => users.filter((user) => user.game === game);

module.exports = { addUser, removeUser, getUser, getUsersInGame, addResponses, getResponses }