const users = [];
const db = require('../models');
const { getQuizId, getQuestionId } = require('./gameController');

const addUser = async ({ id, game, name, icon, color }, cb) => {
    name = name.trim().toLowerCase();
    game = game.trim().toLowerCase();

    const existingUser = users.find((user) => user.game === game && user.name === name);

    if(existingUser){
        return { error: 'That username is already taken in this game!'}
    }

    const user = { id, game, name, icon, color };

    users.push(user);
    
    let quizId;
    let questionId;

    await getQuizId(game, res => {
        console.log("====quizId made it back======");
        console.log(res.quizId);
        quizId = res.quizId
    });
    
    await getQuestionId(quizId, 1, res => {
        console.log("===questionId made it back=====");
        console.log(res.questionId)
        questionId = res.questionId;
    });
    
    await db.QuizScore.create({
        quizId,
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