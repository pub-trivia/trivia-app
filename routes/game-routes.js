const db = require('../models');
const { getQuestion, recordResponse } = require('../controllers/gameController');

module.exports = (app, io) => {

    app.io = io;
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
        return results[0];
    }

    // marks the first question in the quiz as started
    app.post("/api/quiz/start/:quizCode", async (req, res) => {
        const quizInfo = await getQuizDetails(req.params.quizCode, 1)
        const { quizId, questionId } = quizInfo;
        db.QuizQuestionsAssoc.update(
            {progress: "started"},
            {where: {
                quizId,
                questionId
                }
            }).then(result => {
                req.app.io.to(req.params.quizCode).emit('startGame')
                getQuestion(req.params.quizCode, callback => {
                    req.app.io.to(req.params.quizCode).emit('showQuestion', { newquestion: callback });
                })
            }).catch(err => {
                next(err);
            })
    }) 

    //get list of users by quiz
    app.get("/api/quiz/users/:quizCode", async (req, res) => {
        const quizInfo = await getQuizDetails(req.params.quizCode, 1)
        const { quizId, questionId } = quizInfo;
        db.QuizScore.findAll({
            where: {
                quizId,
                questionId
            }
        }).then(result => {
            return res.json(result);
        }).catch(err => {
            next(err);
        })
    })
    
    //used to get the current question for the quiz
    //based on the question marked as 'started'
    app.get("/api/quiz/question/:quizCode", async (req, res) => {
        await getQuestion(req.params.quizCode, callback => {
           req.app.io.to(req.params.quizCode).emit('showQuestion', { callback });
        })
    });

    //checks to see if a quizScore record already exists 
    //based on displayName, quizId, and questionId
    //then either updates or creates the record
    app.post("/api/quiz/response/:quizCode", async (req, res) => {
        console.log("post /api/quiz/response/:quizCode " + req.params.quizCode)
        const { userId, displayName, icon, color, questionId, correct } = req.body;
        await recordResponse(req.params.quizCode, userId, displayName, icon, color, questionId, correct, callback => {
            console.log("==> recordResponse returns");
            console.log(callback);
            req.app.io.to(req.params.quizCode).emit('respData', { callback });
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
        }).catch(err => {
            next(err);
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
            // db.Question.findOne({ 
            //     where: {
            //         questionId
            //         }
            //     }).then(ques => {
            //         return ques.increment({
            //             correctCount: numCorrect,
            //             incorrectCount: players - numCorrect
            //         })
            //     }).catch(err => {
            //         next(err);
            //     })
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
                }).catch(err => {
                    next(err);
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
                }).catch(err => {
                    next(err);
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
        }).catch(err => {
            next(err);
        })
        //TODO: increment winner's games won
    }) 
}