var db = require("../models");

// routes: 
// GET /api/finduser/:email - find a user by email when they login
// GET /api/getscores/:quizid - get all the scores for that quiz 
// GET /api/getuser/:userid - get all the data for that user 
// GET /api/getquestions/:quizid or criteria?  
// 
// POST /api/createuser - create a new user
// POST /api/createquiz - create a new quiz, pass in number of questions, 
//       category, difficulty, userId
// POST /api/createquestion - create a new question
// POST /api/addscore/:quiz - add a score for a quiz 
//
// UPDATE /api/question/:questionid - mark for moderation
// UPDATE /api/userscore/ pass in updates to questions answered, 
//       correct, games played, games won 


module.exports = function (app) {

    app.get("/api/finduser/:email", (req, res) => {
        db.User.findOne({
            where: { email: req.params.email }
        })
            .then(result => {
                console.log(result);
                if (result === 0) {
                    // not found 
                    return res.status(404).end();
                }
                else {
                    return res.json(result);
                }

            });

    });

    app.get("/api/getuser/:userId", (req, res) => {
        db.User.fineOne({
            where: { userId }
        })
            .then(result => {
                console.log("/api/getuser: ", result);
                return res.json(result);
            });
    });

    app.get("/api/getquestions/:quizid", (req, res) => {
        db.Quiz.findOne({
            where: { quizId }
        })
            .then(result => {
                console.log(result);
            });
    });

    app.get("api/getscores/:quizid", (req, res) => {
        db.QuizScore.findAll({
            where: { quizId: req.params.quizId }
        })
            .then(result => {
                console.log(result);
                return res.json(result);
            });
    });

    app.post("/api/createuser/", (req, res) => {
        // verify that does not already exist? 
        const { displayName, email, password, avatar, avatarColor } = req.body;
        db.User.create({
            displayName,
            email,
            password,
            avatar,
            avatarColor
        });
        res.status(204).end;
    });

}