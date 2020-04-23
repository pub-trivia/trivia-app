const db = require('../models');

module.exports = (app) => {

    //utility function to grab quizId and questionIds
    const getQuizDetails = async (quiz, qNum) => {
        let queryString = `SELECT q.quizId, u.questionId
                            FROM Quizzes q
                            INNER JOIN quizQuestionsAssoc u ON q.quizId = u.quizId
                            WHERE q.quizCode=\"${quiz}\" AND q.isActive=1 AND u.questionOrder=${qNum};`
        const [results, metadata] = await db.sequelize.query(queryString)
        return results[0];
    }

    //utility function to grab started question
    const getStarted = async (quiz) => {
        let queryString = `SELECT q.quizId, u.questionId, u.questionOrder, q.questionCount
                            FROM Quizzes q
                            INNER JOIN quizQuestionsAssoc u ON q.quizId = u.quizId
                            WHERE q.quizCode=\"${quiz}\" AND q.isActive=1 AND u.progress="started";`
        const [results, metadata] = await db.sequelize.query(queryString)
        return results[0];
    }

    // used when a user clicks the 'join' button
    // adds a quizScore record for the first question in the quiz
    // we'll update this record after the first question
    // we also use this data in a later call to pull which users
    // are in the quiz and whether they've responded to the question
    app.post("/api/join/:quizCode", async (req, res) => {
        const { displayName, icon, color } = req.body;
        const quizInfo = await getQuizDetails(req.params.quizCode, 1)
        const { quizId, questionId } = quizInfo;
        db.QuizScore.create({
            quizId,
            questionId,
            displayName,
            icon,
            color,
            correct: false
        }).then(result => {
            return res.json(result.dataValues);
        }) 
    })

    // marks the first question in the quiz as started
    app.post("/api/quiz/start/:quizCode", async (req, res) => {
        console.log("post /api/quiz/start/:quizCode " + req.params.quizCode);
        const quizInfo = await getQuizDetails(req.params.quizCode, 1)
        const { quizId, questionId } = quizInfo;
        db.QuizQuestionsAssoc.update(
            {progress: "started"},
            {where: {
                quizId,
                questionId
                }
            }).then(result => {
                console.log(`${result} rows updated`)
                return res.json(result);
            })
    }) 

    //get list of users by quiz
    app.get("/api/quiz/users/:quizCode", async (req, res) => {
        console.log("get /api/quiz/users/:quizCode " + req.params.quizCode);
        const quizInfo = await getQuizDetails(req.params.quizCode, 1)
        const { quizId, questionId } = quizInfo;
        db.QuizScore.findAll({
            where: {
                quizId,
                questionId
            }
        }).then(result => {
            return res.json(result);
        })
    })
    
    //used to get the current question for the quiz
    //based on the question marked as 'started'
    app.get("/api/quiz/question/:quizCode", async (req, res) => {
        console.log("get /api/quiz/question/:quizCode " + req.params.quizCode)
        const qInfo = await getStarted(req.params.quizCode)
        const { questionId } = qInfo;
        db.Question.findOne({
            where: {
                questionId
            }
        }).then(result => {
            console.log("=========== question retrieved =========")
            console.log(result.dataValues);
            return res.json(result.dataValues);
        })
    })

    //checks to see if a quizScore record already exists 
    //based on displayName, quizId, and questionId
    //then either updates or creates the record
    app.post("/api/quiz/response/:quizCode", async (req, res) => {
        console.log("post /api/quiz/response/:quizCode " + req.params.quizCode)
        const { displayName, icon, color, correct } = req.body;
        const qInfo = await getStarted(req.params.quizCode)
        const { quizId, questionId } = qInfo;
        db.QuizScore.findOne({
            where: {
                quizId, 
                questionId,
                displayName,
                icon,
                color
            }
        }).then(result => {
            if (!result) {
                //no record exists, so create one
                db.QuizScore.create({
                    quizId,
                    questionId,
                    displayName,
                    icon,
                    color,
                    correct
                }).then(result => {
                    return res.json(result);
                })
            } else {
                //if a record already exists, update it
                db.QuizScore.update({
                    correct,
                    where: {
                        quizId,
                        questionId,
                        displayName
                    }
                }).then(result => {
                    return res.json(result);
                })
            }
        })
    })
    
    //used to grab scores after a question has been "closed"
    //reflects player's score so far in the game
    app.get("/api/quiz/scores/:quizCode", async (req, res) => {
        console.log("get /api/quiz/scores/:quizCode for " + req.params.quizCode);
        const qInfo = await getStarted(req.params.quizCode)
        const { quizId, questionCount } = qInfo;
        let queryString = `SELECT u.displayName, u.icon, u.color, (100 * SUM(u.correct) / ${questionCount}) AS score
                            FROM Quizzes q
                            INNER JOIN QuizScores u ON q.quizId = u.quizId
                            WHERE q.quizId=${quizId}
                            GROUP BY u.displayName, u.icon, u.color
                            ORDER BY score DESC;`
        const [results, metadata] = await db.sequelize.query(queryString);
        console.log("=======results of score========");
        console.log(results);
        return res.json(results);


    })
}