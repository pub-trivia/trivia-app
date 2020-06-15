const db = require('../models');
const { getQuizId, startQuiz, checkStart, recordResponse } = require('../controllers/gameController');
const { addPlayer } = require("../controllers/userController");
const { readyTimer } = require("../controllers/roomTimer");
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

    // marks the first question in the quiz as started
    app.post("/api/quiz/start/:quizCode", async (req, res) => {
        console.log("==> app.post /api/quiz/start/:quizCode")
        console.log(req.params.quizCode);
        await startQuiz(req.params.quizCode, resp => {
            req.app.io.to(req.params.quizCode).emit('startGame')
        })
        //add a pause to ensure everyone is on /game
        //before the first q is sent
        await readyTimer(req.params.quizCode, req.app.io);
        return; 
    }) 

    app.post("/api/quiz/player/:quizCode", async (req, res) => {
        const { userId, displayName, icon, color } = req.body;
        await addPlayer(req.params.quizCode, userId, displayName, icon, color, callback => {
            console.log("==> app.post addPlayer returns")
            console.log(callback);
            return res.json(callback);
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

    //records the user's response to the question
    app.post("/api/quiz/response/:quizCode", async (req, res) => {
        const { userId, displayName, icon, color, questionId, correct } = req.body;
        await recordResponse(req.params.quizCode, userId, displayName, icon, color, questionId, correct, callback => {
            req.app.io.to(req.params.quizCode).emit('respData', { callback });
            return res.json("recorded");
        })
    })

    app.get("/api/quiz/validate/:quizCode", async (req, res) => {
        const quizCode = req.params.quizCode;
        let quizId;

        await getQuizId(quizCode, resp => {
            quizId = resp.quizId;

            if(resp === "Inactive"){
                return res.json({ text: "This quiz is no longer active"});
            } else {
                checkStart(quizId, resp => {
                    if(resp.progress === "started" || resp.progress === "completed"){
                        return res.json({ text: "This quiz has already started"});
                    } else {
                        return res.json(resp);
                    }
                })
            }
        })
  
    })

}