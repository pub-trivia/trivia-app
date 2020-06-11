const db = require('../models');

const getQuestion = async (game, callback) => {
    let quizId;
    
    await getQuizId(game, res => {
        quizId = res.quizId
    });
    
    let queryString =  `SELECT * 
                          FROM Questions q
                          INNER JOIN QuizQuestionsAssoc a ON q.questionId = a.questionId
                          WHERE a.quizId=${quizId} AND a.progress="started";`
    const [results, metadata] = await db.sequelize.query(queryString)
    return callback(results[results.length - 1]);
}

const getQuizId = async (game, callback) => {
    await db.Quiz.findOne({
        attributes: ['quizId', 'questionCount'],
        where: {
            quizCode: game,
            isActive: 1  
        }
    }).then(result => {
        return callback(result.dataValues);
    }).catch(err => {
        next(err)
    })
}

const getQuestionId = async (quizId, qNum, callback) => {
    await db.QuizQuestionsAssoc.findOne({
        attributes: ['questionId'],
        where: {
            quizId,
            questionOrder: qNum
        }
    }).then(result => {
        return callback(result.dataValues);
    }).catch(err => {
        next(err)
    })
}

module.exports = { getQuizId, getQuestionId, getQuestion }