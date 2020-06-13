const users = [];
const db = require('../models');
const { getQuizId, getQuestionId } = require('./gameController');

const addUser = async ({ id, game, userId, name, icon, color }, cb) => {
    name = name.trim().toUpperCase();
    game = game.trim().toUpperCase();
    if (!userId) {
        userId = 999999999;
    }
    
    const existingUser = users.find((user) => user.game === game && user.name === name);

    if(existingUser){
        return { error: 'That username is already taken in this game!'}
    }

    const user = { id, game, userId, name, icon, color };

    users.push(user);
    
    let quizId;
    let questionId;

    await getQuizId(game, res => {
        quizId = res.quizId
    });
    
    await getQuestionId(quizId, 1, res => {
        questionId = res.questionId;
    });
    //creates the first score value for the user
    //we use this to populate the waiting room
    //with users that are in the game
    await db.QuizScore.create({
        quizId,
        userId,
        questionId,
        displayName: name,
        icon,
        color,
        correct: false
    }).then(result => {
    }).catch(err => {
        next(err);
    })

    return { user };
    
}

const removeUser = (id) => {

    const index = users.findIndex((user) => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInGame = (game) => users.filter((user) => user.game === game);

module.exports = { addUser, removeUser, getUser, getUsersInGame }