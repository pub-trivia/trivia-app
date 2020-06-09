const db = require('../models');

const getQuestion = async (game, callback) => {
    let quizId;
    
    await getQuizId(game, res => {
        console.log("====quizId made it back======");
        console.log(res.quizId);
        quizId = res.quizId
    });
    
    await db.Question.findOne({
        include: { 
            model: QuizQuestionsAssoc,
            where: {
                quizId,
                progress: 'started'
            }
        }
    }).then(result => {
        console.log("returning from getQuestion");
        console.log(result.dataValues);
        return callback(result.dataValues);
    }).catch(err => {
        next(err);
    })
}

const getQuizId = async (game, callback) => {
    console.log("reached getQuizId")
    console.log(game);
    await db.Quiz.findOne({
        attributes: ['quizId', 'questionCount'],
        where: {
            quizCode: game,
            isActive: 1  
        }
    }).then(result => {
        console.log("returning from getQuizId");
        console.log(result.dataValues);
        return callback(result.dataValues);
    }).catch(err => {
        next(err)
    })
}

const getQuestionId = async (quizId, qNum, callback) => {
    console.log("reached getQuestionId")
    console.log(quizId);
    await db.QuizQuestionsAssoc.findOne({
        attributes: ['questionId'],
        where: {
            quizId,
            questionOrder: qNum
        }
    }).then(result => {
        console.log("=====returning from getQuestionId=====");
        console.log(result.dataValues);
        return callback(result.dataValues);
    }).catch(err => {
        next(err)
    })
}

module.exports = { getQuizId, getQuestionId, getQuestion }