const db = require('../models');

module.exports = (app) => {

    //utility function to grab quizId and questionIds
    const getQuizDetails = (quiz, qNum) => {
        let queryString = `SELECT q.quizId, u.questionId
                            FROM Quizzes q
                            INNER JOIN quizQuestionsAssoc u ON q.quizId = u.quizId
                            WHERE q.quizCode=\"${quiz}\" AND q.isActive=1 AND u.questionOrder=${qNum};`
        db.sequelize.query(queryString)
            .then(result => {
                return result;
            })
    }

    // used when a user clicks the 'join' button
    // adds a quizScore record for the first question in the quiz
    // we'll update this record after the first question
    // we also use this data in a later call to pull which users
    // are in the quiz and whether they've responded to the question
    app.post("/api/join/:quizCode", (req, res) => {
        console.log("post /api/join/:quizCode " + req.params.quizCode);
        const { displayName, icon, color } = req.body;
        const quizInfo = getQuizDetails(req.params.quizCode, 1)
            .then(result => {
                const { quizId, questionId } = result.data;
                db.QuizScore.create({
                    quizId,
                    questionId,
                    displayName,
                    icon,
                    color,
                    correct: false
                }) 
            })
    })

    // marks the first question in the quiz as started
    app.post("/api/quiz/start/:quizCode", (req, res) => {
        console.log("post /api/quiz/start/:quizCode " + req.params.quizCode);
        const quizInfo = getQuizDetails(req.params.quizCode, 1)
            .then(result => {
                const { quizId, questionId } = result.data;
                db.QuizQuestionsAssoc.update({
                    
                    quizId,
                    questionId,
                    displayName: name,
                    icon,
                    color,
                    correct: false
                }) 
            })
    })

    //used to get the current question for the quiz
    //based on the question marked as 'started'
    app.get("/api/quiz/question/:quizCode", (req, res) => {
        console.log("get /api/quiz/question/:quizCode " + req.params.quizCode)
        const quizInfo = getQuizDetails(req.params.quizCode, qNum)
    })

    app.post("/api/quiz/response/:")
    app.get("/api/quiz/")
}