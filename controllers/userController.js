const users = [];
const db = require('../models');
const { getQuizId, getQuestionId } = require('./gameController');

const addPlayer = async (game, userId, displayName, icon, color, callback) => {
    displayName = displayName.trim().toUpperCase();
    game = game.trim().toUpperCase();
    
    if (!userId) {
        userId = 999999999;
    }

    let quizId;
    let questionId;

    await getQuizId(game, res => {
        quizId = res.quizId
    });
    
    await getQuestionId(quizId, 1, res => {
        questionId = res.questionId;
    });

    const existingUser = 
        await db.QuizScore.findOne({
            where: {
                quizId,
                questionId,
                displayName
            }
        })
    
    if(existingUser){
        return callback({ error: 'That username is already taken in this game!'});
    } else {
        //creates the first score value for the user
        //we use this to populate the waiting room
        //with users that are in the game
        await db.QuizScore.create({
            quizId,
            userId,
            questionId,
            displayName,
            icon,
            color,
            correct: false
        }).then(result => {
            return callback(result);
        }).catch(err => {
            console.log(err);
        })
    }
}

const addUserSocket = async ({ id, game, name }, cb) => {
    name = name.trim().toUpperCase();
    game = game.trim().toUpperCase();
    
    //associate a socketid with a user and game
    //this value is destroyed when the socket is disconnected
    const user = { id, game, name };
    users.push(user);
    
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

module.exports = { addPlayer, addUserSocket, removeUser, getUser, getUsersInGame }