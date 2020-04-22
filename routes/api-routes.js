var db = require("../models");
const { Op } = require("sequelize");
var passport = require("../config/passport");

// routes:   *'s are working
// *GET /api/login/ - gets email and password, returns the userid
// *GET /api/finduser/:email - find a user by email when they login
// *GET /api/getscores/:quizid - get all the scores for that quiz
// *GET /api/getuser/:userid - get all the data for that user
// *GET /api/categories/  - returns all question categories
// *GET /api/user/data/:userid - get total questions answered and correct
//     answers by userid
// *GET /api/user/questions/:userid - returns that user's questions
// *GET /api/getquestions - returns the number of questions specified
//    that match the criteria in the form (can pass in quiz record data)
// *GET /api/quizbycode/:code - get quiz information by the code
// *GET /api/quizbyid/:quizid - get quiz information by the id
// *GET /api/quiz/questions/:quizid, not sure if we need this?
//
// *POST /api/createuser - create a new user, returns newUserObject
// *POST /api/createquiz - create a new quiz, pass in number of questions,
//       category, difficulty, userId, returns newQuizObject
// *POST /api/createquestion - create a new question
// *POST /api/addquestionscore/ - add a questionId/correct true/false for a quiz
//
// *PUT /api/question/moderate/:questionid - mark for moderation
//    can call above but doesn't yet work
// *PUT /api/gameplayed/:userid/:won pass in updates to questions answered,
//       correct, games played, games won
// GET /api/question/counts - update the question - how many answered
//    correctly / incorrectly

module.exports = function (app) {
  app.get("/api/categories", (req, res) => {
    db.sequelize
      .query("SELECT DISTINCT category FROM questions")
      .then((results) => {
        let categories = results[0].map((result) => result.category);
        return res.json(categories);
      });
  });

  app.get("/api/user/data/:userid", (req, res) => {
    // following query gets just the question counts
    // const query = `SELECT userId, SUM(correct) AS correctAnswers, COUNT(createdAt) AS totalAnswers` +
    //   ` FROM quizscores WHERE userId = ${req.params.userid} ;`;
    const query =
      `SELECT A.userId, SUM(A.correct) AS correctAnswers, COUNT(A.createdAt) AS totalAnswers,` +
      ` b.displayName, gamesWon, gamesPlayed FROM quizscores AS A INNER JOIN users AS B` +
      ` WHERE A.userId = ${req.params.userid} AND A.userid = B.userId;`;
    db.sequelize.query(query).then((results) => {
      return res.json(results[0]);
    });
  });

  app.get("/api/user/questions/:userid", (req, res) => {
    db.Question.findAll({
      where: {
        userId: req.params.userid,
      },
    }).then((results) => {
      res.json(results);
    });
  });

  app.get("/api/getscores/:quizId", (req, res) => {
    console.log("/api/getscores/ called: quiz ", req.params);
    const query =
      `SELECT userId, displayName, SUM(correct) AS correctAnswers, COUNT(createdAt) AS totalAnswers` +
      ` FROM quizScores WHERE quizId = ${req.params.quizId} group by userId ;`;
    db.sequelize.query(query).then((results) => {
      return res.json(results[0]);
    });
  });

  app.get("/api/quiz/questions/:quizid", (req, res) => {
    console.log("GET api/quiz/questions: ", req.params);
    const query = `SELECT DISTINCT questionId FROM quizScores WHERE quizId = ${req.params.quizid} ;`;
    db.sequelize.query(query).then((results) => {
      let questions = results[0].map((question) => question.questionId);
      return res.json(questions);
    });
  });

  app.get("/api/quiz/questions/:quizid/:questionNum", (req, res) => {
    console.log(`/api/quiz/questions/ getting q: ${req.params.questionNum} for ${req.params.quizid}`);
    const query = `SELECT * 
                      FROM QuizQuestionsAssoc o
                        INNER JOIN quizzes z ON z.quizId = o.quizId
                        INNER JOIN Questions q ON o.questionId = q.questionId 
                        WHERE z.quizCode = \"${req.params.quizid}\" AND o.questionOrder = ${req.params.questionNum};`;
    db.sequelize.query(query)
      .then((result) => {
        return res.json(result); 
    })
  });

  app.post("/api/createquiz", (req, res) => {
    console.log("/api/createquiz/ ", req);
    const { userId, category, difficulty, questionCount } = req.body;
    let quizCode = getQuizCode();

    db.Quiz.create({
      userId,
      category,
      difficulty,
      questionCount,
      quizCode,
    }).then((response) => {
      console.log("response from Quiz creation: ", response);
    });
    res.status(204).end;
  });

  app.get("/api/getcode", (req, res) => {
    let codeArray = [];
    let quizCode;
    db.sequelize.query("SELECT quizCode FROM quizzes").then((results) => {
      let codeArray = results[0].map((result) => result.quizCode);
      console.log(codeArray);
      // make sure generated code doesn't match any other codes
      quizCode = generateRandomCode();
      while (codeArray.indexOf(quizCode !== -1)) {
        quizCode = generateRandomCode();
      }
      res.send(quizCode);
    });
  });

  const generateRandomCode = () => {
    // generate random combination of capitals and numbers
    var useChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var useNums = "0123456789";
    var useCharArray = useChars.split("");
    var useNumArray = useNums.split("");
    let randomCode = "";
    var pickIndex = 0;
    var charPicked = "";
    for (let i = 0; i < 4; i++) {
      if (i % 2 === 1) {
        pickIndex = Math.floor(Math.random() * useCharArray.length);
        charPicked = useCharArray[pickIndex];
      } else {
        pickIndex = Math.floor(Math.random() * useNumArray.length);
        charPicked = useNumArray[pickIndex];
      }
      randomCode = randomCode + charPicked;
    }
    return randomCode;
  };

  app.get("/api/quizbyid/:quizid", (req, res) => {
    db.Quiz.findOne({
      where: {
        quizId: req.params.quizid,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  app.get("/api/quizbycode/:code", (req, res) => {
    console.log("===========api/quizbycode/:code=======");
    console.log(req.params.code);
    db.Quiz.findOne({
      where: {
        quizCode: req.params.code,
      },
    }).then((result) => {
      res.json(result);
    });
  });

  app.post("/api/addquestionscore", (req, res) => {
    const {
      quizId,
      userId,
      questionId,
      displayName,
      icon,
      color,
      correct,
    } = req.body;
    db.QuizScore.create({
      quizId,
      userId,
      questionId,
      displayName,
      icon,
      color,
      correct,
    }).then((result) => {
      res.json(result);
    });
  });

  app.get("/api/getquestions", (req, res) => {
    // get questions for a quiz
    const { quizId, category, difficulty, count, userId } = req.body;
    db.Question.findAll({
      where: {
        category: category,
        difficulty: difficulty,
        userId: { [Op.ne]: userId },
        needsModeration: false,
      },
      limit: count * 2,
    }).then((results) => {
      res.json(results);
    });
  });

  app.get("/api/user/questions/:userid", (req, res) => {
    db.Question.findAll({
      where: {
        userId: req.params.userid,
      },
    }).then((results) => {
      res.json(results);
    });
  });

  app.post("/api/createquestion", (req, res) => {
    const {
      question,
      category,
      difficulty,
      userId,
      questionType,
      answer1,
      answer2,
      answer3,
      answer4,
      correctIndex,
    } = req.body;
    if (questionType === "tf") {
      answer1 = "True";
      answer2 = "False";
    }
    db.Question.create({
      question,
      category,
      difficulty,
      userId,
      questionType,
      answer1,
      answer2,
      answer3,
      answer4,
      correctIndex,
    })
      .then((newQuestion) => {
        res.json(newQuestion);
      })
      .catch((err) => res.json(err));
  });

  app.put("/api/gameplayed/:userid/:won", (req, res) => {
    console.log("/api/gameplayed/: ", req.params);
    const { userid, won } = req.params;
    var addwin = "";
    if (won === "true") addwin = "gamesWon = gamesWon + 1,";
    let query =
      `UPDATE users SET ${addwin} gamesPlayed = gamesPlayed + 1 ` +
      `WHERE userid = ${userid};`;
    db.sequelize.query(query).then((result) => {
      res.json(result[0]);
    });
  });

  app.put("/api/gameplayed/:userid/:won", (req, res) => {
    console.log("/api/gameplayed/: ", req.params);
    const { userid, won } = req.params;
    var addwin = "";
    if (won === "true") addwin = "gamesWon = gamesWon + 1,";
    let query =
      `UPDATE users SET ${addwin} gamesPlayed = gamesPlayed + 1 ` +
      `WHERE userid = ${userid};`;
    db.sequelize.query(query).then((result) => {
      res.json(result[0]);
    });
  });

  app.put("/api/question/moderate/:questionid", (req, res) => {
    const { questionid } = req.params.questionid;
    db.Question.update(
      { needsModeration: true },
      { where: { questionId: questionid } }
    )
      .then((response) =>
        console.log(`Question ${questionid} marked for moderation.`)
      )
      .catch((err) =>
        console.log(`Update for question ${req.params.questionid} failed.`)
      );
  });

  // Added a logout route
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
};
