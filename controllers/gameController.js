const { roomTimer } = require("/roomTimer");
const db = require('../models');

const getQuestion = (game, io) => {
    const { quizId, questionCount } = getQuizId(game);
    db.Questions.findOne({
        include: [{ 
            model: QuizQuestionsAssoc,
            where: {
                quizId,
                progress: 'started'
            }
        }]
    })
}


const getQuizId = (game) => {
    db.quizzes.findOne({
        attributes: ['quizId', 'questionCount'],
        where: {
            quizCode: game,
            isActive: 1  
        }
    }).then(result => {
        return result.dataValues;
    })
}