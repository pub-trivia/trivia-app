require('dotenv').config();
var db = require("../models");
const { Op } = require("sequelize");

// routes:   *'s are working
//
// NOW IN auth-routes.js 
// *GET /api/login/ - now in auth-routes.js
// *GET /api/getuser/:userid - now in auth-routes.js 
// *GET /api/finduser/:email - find a user by email when they attempt
//      to sign up 
//
// ROUTES IN api-routes.js
//
// *GET /api/categories/  - returns all question categories
//
// *GET /api/user/data/:userid - get totals for profile page 
// *GET /api/user/questions/:userid - returns that user's questions
//      with answer counts for profile page 
//  
// *GET /api/quiz/scores/:quizid - get the scores for each user on a quiz
// *GET /api/quiz/questions/:quizid - get the questions for a quiz

// *GET /api/getquestions - returns the number of questions specified
//    that match the criteria in the form (can pass in quiz record data)
// *GET /api/quizbycode/:code - get quiz information by the code
// *GET /api/quizbyid/:quizid - get quiz information by the id
// 
// *GET /api/getcode - returns a unique 4-digit code for a new quiz
// *POST /api/quiz - create a new quiz, pass in number of questions,
//       category, difficulty, userId, returns new QuizId (need to get code first!)
// *POST /api/createquestion - create a new question

// *PUT /api/question/moderate/:questionid - mark for moderation
//    can call above but doesn't yet work
//

module.exports = function (app) {
  app.get("/api/categories", (req, res) => {
    db.sequelize
      .query("SELECT DISTINCT category FROM Questions")
      .then((results) => {
        let categories = results[0].map((result) => result.category);
        return res.json(categories);
      });
  });

  app.get("/api/user/data/:userid", (req, res) => {
    const query =
      `SELECT A.userId, SUM(A.correct) AS correctAnswers, COUNT(A.createdAt) AS totalAnswers,` +
      ` B.displayName, gamesWon, gamesPlayed FROM QuizScores AS A INNER JOIN Users AS B` +
      ` WHERE A.userId = ${req.params.userid} AND A.userId = B.userId;`;
    db.sequelize.query(query).then((results) => {
      return res.json(results[0]);
    });
  });

  app.get("/api/user/questions/:userid", (req, res) => {
    // add in answer counts for questions 
    let query = `SELECT Q.question, Q.questionId, Q.category, Q.difficulty, SUM(C.correct) AS correctCount, COUNT(C.createdAt) AS totalCount  
    FROM Questions Q LEFT JOIN QuizScores C ON Q.questionId = C.questionId  
        WHERE Q.userId = ${req.params.userid} GROUP BY Q.question, Q.questionId;`;
    db.sequelize.query(query)
      .then((results) => {
        let questions = results[0].map(question => {
          question.correctCount = question.correctCount === null ? 0 : question.correctCount;
          return question;
        });
        res.json(questions);
      });
  });

  app.post("/api/quiz", (req, res) => {
    const { userId, category, difficulty, questionCount, quizCode } = req.body;
    db.Quiz.create({
      userId,
      category,
      difficulty,
      questionCount,
      quizCode,
    }).then((response) => {
      getQuizQuestions(response.dataValues.quizId, category, difficulty, questionCount, userId);
      res.json(response.quizCode);
    });
  });

  function getQuizQuestions(quizId, category, difficulty, questionCount, userId) {
    // get questions for a quiz 
    db.Question.findAll({
      where: {
        category: category,
        difficulty: difficulty,
        userId: { [Op.ne]: userId },
        needsModeration: false
      },
      order: db.sequelize.random(),
      limit: parseInt(questionCount)
    })
      .then(results => {
        console.log("Results from get questions: ", results);
        let associations = results.map((question, index) => {
          return {
            quizId: quizId,
            questionId: question.dataValues.questionId,
            questionOrder: index + 1,
            progress: null
          };
        });
        db.QuizQuestionsAssoc.bulkCreate(associations)
          .then(response => {
            console.log("response from bulkCreate: ", response);
          })

      });
    return;
  }

  app.get("/api/getcode", (req, res) => {
    let codeArray = [];
    let quizCode = "A1B2";
    db.sequelize.query("SELECT quizCode FROM quizzes WHERE isActive=true").then((results) => {
      codeArray = results[0].map((result) => result.quizCode);
      quizCode = generateRandomCode();
      while (codeArray.indexOf(quizCode) !== -1) {
        quizCode = generateRandomCode();
      }
      res.json(quizCode);
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
      if (i % 2 === 0) {
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

  app.post("/api/createtfquestion", (req, res) => {
    console.log("reached /api/createtfquestion: ", req.body);
    let {
      question,
      category,
      difficulty,
      userId,
      correctIndex,
    } = req.body;
    const questionType = "tf";
    const answer1 = "True";
    const answer2 = "False";
    const answer3 = "";
    const answer4 = "";

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

  app.post("/api/createmcquestion", (req, res) => {
    console.log("reached /api/createmcquestion")
    let {
      question,
      category,
      difficulty,
      userId,
      answer1,
      answer2,
      answer3,
      answer4
    } = req.body;

    const questionType = "mc";
    let answerList = [answer1, answer2, answer3];
    console.log("Incorrect answers: ", answerList);
    // randomly insert the correct answer into the answer array
    let correctIndex = Math.floor(Math.random() * 4);
    console.log("Calculated correctIndex: ", correctIndex);
    answerList.splice(correctIndex, 0, answer4);
    console.log("Creating MC question: ", answerList, correctIndex);
    db.Question.create({
      question,
      category,
      difficulty,
      userId,
      questionType,
      answer1: answerList[0],
      answer2: answerList[1],
      answer3: answerList[2],
      answer4: answerList[3],
      correctIndex
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
      `UPDATE Users SET ${addwin} gamesPlayed = gamesPlayed + 1 ` +
      `WHERE userid = ${userid};`;
    db.sequelize.query(query).then((result) => {
      res.json(result[0]);
    });
  });

  app.post("/api/question/moderate/:questionId", (req, res) => {
    let questionId = parseInt(req.params.questionId);
    console.log("/api/question/moderate/:questionId", req.params.questionId);

    db.Question.update(
      { needsModeration: true },
      { where: { questionId } }
    )
      .then((response) =>
        res.json(`Question ${questionId} marked for moderation.`)
      )
      .catch((err) =>
        res.json(`Update for question ${req.params.questionId} failed. ${err}`)
      );
  });

  // send message via Twilio 
  app.post("/api/messages", (req, res) => {

    const twilioFrom = process.env.TWILIO_FROM_NUM;
    const gameMaker = require('twilio')
      (process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN);

    const textList = req.body.phoneNums;
    let currentNumber = "";
    for (let i = 0; i < textList.length; i++) {
      currentNumber = textList[i];
      if (currentNumber === null) continue;
      console.log("Current number: ", currentNumber);
      gameMaker.messages.create({
        to: currentNumber,
        from: twilioFrom,
        body: `The Quiz Maker has invited you to play Pub Trivia! Click the Game Code to play: https://pub-trivia.herokuapp.com/join/${req.body.quizCode}`,
      }, function (err, message) {
        console.log(err);
      });

    }

  })
};
