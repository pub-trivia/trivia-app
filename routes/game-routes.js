const db = require('../models');

module.exports = (app) => {

    //utility function to grab quizId and questionIds
    const getQuizDetails = async (quiz, qNum) => {
        let queryString = `SELECT q.quizId, u.questionId, q.questionCount
                            FROM quizzes q
                            INNER JOIN QuizQuestionsAssoc u ON q.quizId = u.quizId
                            WHERE q.quizCode=\"${quiz}\" AND q.isActive=1 AND u.questionOrder=${qNum};`
        const [results, metadata] = await db.sequelize.query(queryString)
        return results[0];
    }

    //utility function to grab started question
    const getStarted = async (quiz) => {
        let queryString = `SELECT q.quizId, u.questionId, u.questionOrder, q.questionCount
                            FROM quizzes q
                            INNER JOIN QuizQuestionsAssoc u ON q.quizId = u.quizId
                            WHERE q.quizCode=\"${quiz}\" AND q.isActive=1 AND u.progress="started";`
        const [results, metadata] = await db.sequelize.query(queryString)
        return results[0];
    }

    //utility function to save scores after question has been 
    //used in a quiz
    const getQuestionScores = async (quizId, questionId) => {
        //get it from QuizScores table
        let queryString = `SELECT SUM(u.correct) AS numCorrect, COUNT(u.correct) AS players
                            FROM QuizScores u
                            WHERE u.quizId=${quizId} AND u.questionId=${questionId}`
        const [results, metadata] = await db.sequelize.query(queryString);
        console.log("=======results of question score========");
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
                db.QuizScore.update(
                    {correct: correct},
                    {where: {
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

    //get the list of users who have responded to the current question
    //and show them on the scoreboard
    app.get("/api/quiz/responses/:quizCode", async (req, res) => {
        console.log("get /api/quiz/responses/:quizCode " + req.params.quizCode)
        const qInfo = await getStarted(req.params.quizCode)
        const { quizId, questionId } = qInfo;
        db.QuizScore.findAll({
            where: {
                quizId,
                questionId
            },
            order: [['updatedAt', 'DESC']]
        }).then(result => {
            return res.json(result);
        })
    })
    
    //used to grab scores after a question has been "closed"
    //reflects player's score so far in the game
    app.get("/api/quiz/scores/:quizCode", async (req, res) => {
        console.log("get /api/quiz/scores/:quizCode for " + req.params.quizCode);
        const qInfo = await getQuizDetails(req.params.quizCode, 1);
        const { quizId, questionCount } = qInfo;
        let queryString = `SELECT u.displayName, u.icon, u.color, (100 * SUM(u.correct) / ${questionCount}) AS score
                            FROM quizzes q
                            INNER JOIN QuizScores u ON q.quizId = u.quizId
                            WHERE q.quizId=${quizId}
                            GROUP BY u.displayName, u.icon, u.color
                            ORDER BY score DESC;`
        const [results, metadata] = await db.sequelize.query(queryString);
        console.log("=======results of score========");
        console.log(results);
        return res.json(results);
    })

    app.post("/api/quiz/store/:quizCode", async (req, res) => {
        console.log("get /api/quiz/store/:quizCode for " + req.params.quizCode);
        const qInfo = await getStarted(req.params.quizCode);
        const { quizId, questionId, questionOrder, questionCount } = qInfo;
        const scoreCount = await getQuestionScores(quizId, questionId);
        const { numCorrect, players } = scoreCount;
        if (players !== 0){
            //this question is marked as started
            //but has already been asked, you may proceed
            //increment totalNum correct/incorrect in the question table
            db.Question.findOne({ 
                where: {
                    questionId
                    }
                }).then(ques => {
                    return ques.increment({
                        correctCount: numCorrect,
                        incorrectCount: players - numCorrect
                    })
                })
            //change the progress of the question to completed
            await db.QuizQuestionsAssoc.update(
                {progress: "completed"},
                {where: {
                    quizId,
                    questionId,
                    questionOrder
                    }
                }).then(result => {
                    console.log("====Question marked completed====")
                })
            
            if (questionOrder === questionCount){
                //quiz is finished, tell the app to move to results
                return res.json({ gameStatus: "gameover"});
            } else {
                //mark next question as started
                db.QuizQuestionsAssoc.update(
                    {progress: "started"},
                    {where: {
                        quizId,
                        questionOrder: questionOrder + 1
                    }}
                ).then(result => {
                    console.log("====next question marked started ====");
                    console.log(questionOrder + 1);
                    return res.json(result);
                })
            }
        }
         
    })

   // marks the first question in the quiz as started
   app.post("/api/quiz/end/:quizCode", async (req, res) => {
        console.log("post /api/quiz/end/:quizCode " + req.params.quizCode);
        const quizInfo = await getQuizDetails(req.params.quizCode, 1)
        const { quizId } = quizInfo;
        //mark quiz as inactive
        db.Quiz.update(
            {isActive: false},
            {where: {
                quizId
            }}
        ).then(result => {
            return res.json(result);
           
        })
        //TODO: increment winner's games won
    }) 
}