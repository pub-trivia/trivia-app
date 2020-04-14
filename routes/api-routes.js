var db = require("../models");
const { Op } = require("sequelize");

// routes:   *'s are working 
// *GET /api/finduser/:email - find a user by email when they login
// *GET /api/getscores/:quizid - get all the scores for that quiz 
// *GET /api/getuser/:userid - get all the data for that user 
// *GET /api/categories/  - returns all question categories
// *GET /api/user/questions/:userid - returns that user's questions
// *GET /api/getquestions - returns the number of questions specified
//    that match the criteria in the form (can pass in quiz record data) 
// *GET /api/quizbycode/:code - get quiz information by the code 
// *GET /api/quizbyid/:quizid - get quiz information by the id
// GET /api/quiz/questions/:quizid or code, only needed if we keep list permanently?  
// 
// *POST /api/createuser - create a new user, returns newUserObject
// *POST /api/createquiz - create a new quiz, pass in number of questions, 
//       category, difficulty, userId, returns newQuizObject  
// *POST /api/createquestion - create a new question
// *POST /api/addscore/ - add a score for a quiz
//
// *PUT /api/question/moderate/:questionid - mark for moderation
//    can call above but doesn't yet work 
// PUT /api/userscore/ pass in updates to questions answered, 
//       correct, games played, games won 
// PUT /api/question/updatecounts - update the question - how many answered
//    correctly / incorrectly 


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
    db.User.findByPk(req.params.userId)
      .then(result => {
        console.log("/api/getuser: ", result);
        return res.json(result);
      });
  });

  app.get("/api/categories", (req, res) => {
    db.sequelize.query("SELECT DISTINCT category FROM questions")
      .then(results => {
        let categories = results[0].map(result => result.category);
        return res.json(categories);
      });
  });

  app.get("/api/quiz/questions/:quizid", (req, res) => {
    // not currently saving the questions associated with a quiz
    // db.QuizQuestionAssoc.findAll({
    //   where: { quizId: req.params.quizId }
    // })
    //   .then(result => {
    //     console.log(result);
    //   });
    return res.status(200).end();
  });

  app.get("/api/getscores/:quizId", (req, res) => {
    console.log("/api/getscores/ called: quiz ", req.params);
    db.QuizScore.findAll({
      where: { quizId: req.params.quizId }
    })
      .then(result => {
        console.log(result);
        return res.json(result);
      });
  });

  app.post("/api/createuser", (req, res) => {
    console.log(req.body);
    const { displayName, email, password, avatar, avatarColor } = req.body;
    db.User.findOne({
      where: { email }
    })
      .then(result => {
        if (result !== null) {
          res.send({ message: "Email already registered." }).end();
        }
        db.User.create({
          displayName,
          email,
          password,
          avatar,
          avatarColor
        })
          .then(response => {
            console.log("userId of new user: ", response.userId);
            res.json(response);
          });
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
      quizCode
    })
      .then(response => {
        console.log("response from Quiz creation: ", response);
      });
    res.status(204).end;
  });

  app.get("/api/getcode", (req, res) => {
    let codeArray = [];
    let quizCode;
    db.sequelize.query("SELECT quizCode FROM quizzes")
      .then(results => {
        let codeArray = results[0].map(result => result.quizCode);
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
    var useChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var useCharArray = useChars.split("");
    let randomCode = "";
    for (var i = 0; i < 6; i++) {
      var pickIndex = Math.floor(Math.random() * useCharArray.length);
      var charPicked = useCharArray[pickIndex];
      randomCode = randomCode + charPicked;
    }
    return randomCode;
  }

  app.get("/api/quizbyid/:quizid", (req, res) => {
    db.Quiz.findOne({
      where: {
        quizId: req.params.quizid
      }
    })
      .then(result => {
        res.json(result)
      })
  });

  app.get("/api/quizbycode/:code", (req, res) => {
    db.Quiz.findOne({
      where: {
        quizCode: req.params.code
      }
    })
      .then(result => {
        res.json(result)
      })
  });

  app.post("/api/addscore", (req, res) => {
    const { quizId, userId, displayName, avatar, avatarColor } = req.body;
    db.QuizScore.findOne({
      where: { quizId: quizId, displayName: displayName }
    })
      .then(result => {
        if (result !== null) {
          // increment existing record
          // should also be able to search on userid....   
          console.log("Result when record found:", result);
          db.QuizScore.update(
            {
              userId: result.dataValues.userId,
              displayName: result.dataValues.displayName,
              score: result.dataValues.score + 1
            },
            { where: { quizId, displayName } }
          )
            .then(result => res.json(result));
        } else {
          // create a new record           
          db.QuizScore.create({
            quizId,
            userId,
            displayName,
            avatar,
            avatarColor,
            score: 1
          })
            .then(result => {
              res.json(result);
            });
        }
      });
  })

  app.get("/api/getquestions", (req, res) => {
    const { quizId, category, difficulty, count, userId } = req.body;
    console.log("/api/getquestions:", req.body);
    db.Question.findAll({
      where: {
        category: category,
        difficulty: difficulty,
        userId: { [Op.ne]: userId },
        needsModeration: false
      },
      limit: count * 2
    })
      .then(results => {
        res.json(results);
      })
  });

  app.get("/api/user/questions/:userid", (req, res) => {

    console.log("/api/user/questions/:userid", req.params.userid);
    db.Question.findAll({
      where: {
        userId: req.params.userid
      }
    })
      .then(results => {
        // for (let q = 0; q < count && q < results.length; q++) {
        //   db.quizQuestionsAssoc.create({
        //     quizId,
        //     questionId: results[q].questionId
        //   });
        // }
        res.json(results);
      })
  });

  app.post("/api/createquestion", (req, res) => {
    const { question, category, difficulty, userId, questionType, answer1, answer2, answer3, answer4, correctIndex } = req.body;
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
      correctIndex
    })
      .then(newQuestion => {
        res.json(newQuestion);
      })
      .catch(err => res.json(err));
  });

  app.put("/api/question/moderate/:questionid", (req, res) => {
    const { questionid } = req.params.questionid;
    db.Question.update(
      { needsModeration: true },
      { where: { questionId: questionid } }
    )
      .then(response => console.log(`Question ${questionid} marked for moderation.`))
      .catch(err => console.log(`Update for question ${req.params.questionid} failed.`))
  });

};