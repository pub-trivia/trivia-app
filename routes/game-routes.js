const { getQuizId, getQuestionId, startQuiz, checkStart, getResponses, recordResponse } = require('../controllers/gameController');
const { addPlayer } = require("../controllers/userController");
const { readyTimer } = require("../controllers/roomTimer");
module.exports = (app, io) => {

    app.io = io;

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
        let quizId;
        let questionId;

        await getQuizId(req.params.quizCode, resp => {
            quizId = resp.quizId;
        })

        await getQuestionId(quizId, 1, resp => {
            questionId = resp.questionId;
        })

        await getResponses(quizId, questionId, callback => {
            return res.json(callback);
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