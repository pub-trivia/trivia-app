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

const getResponses = async (quizId, questionId, callback) =>{
    await db.QuizScore.findAll({
        where: {
            quizId,
            questionId
        },
        order: [['updatedAt', 'DESC']]
    }).then(result => {
        return callback(result);
    }).catch(err => {
        next(err);
    })
}

const recordResponse = async (quizCode, userId, displayName, icon, color, questionId, correct, callback) => {
    let quizId;
    let name = displayName.toUpperCase();
    if (!userId) {
        userId = 999999999;
    }
    
    await getQuizId(quizCode, res => {
        quizId = res.quizId
    });
    //look for a response from this user
    await db.QuizScore.findOne({
        where: {
            quizId, 
            userId,
            questionId,
            displayName: name,
            icon,
            color
        }
    }).then(result => {
        if (!result) {
            //if no record exists, create one
            db.QuizScore.create({
                quizId,
                userId,
                questionId,
                displayName: name,
                icon,
                color,
                correct
            }).then(result => {
                console.log("new response created");
                console.log(result)
                getResponses(quizId, questionId, res => {
                    return callback(res)
                });
            }).catch(err => {
                console.log(err);
            })
        } else {
            //if a record already exists, update it
            db.QuizScore.update(
                {correct: correct},
                {where: {
                    quizId,
                    userId,
                    questionId,
                    displayName: name
                }
            }).then(result => {
                console.log("response updated");
                console.log(result);
                getResponses(quizId, questionId, res => {
                    return callback(res)
                });
            }).catch(err => {
                console.log(err);
            })
        }
        
    }).catch(err => {
        next(err);
    })
}

module.exports = { getQuizId, getQuestionId, getQuestion, recordResponse }