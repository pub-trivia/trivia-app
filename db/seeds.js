const mysql = require("mysql");
require("dotenv").config();
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);
const db = require("../models");


async function loadSeeds() {

  db.User.create({
    displayName: "External",
    email: "test@dummy.com",
    password: "",
    icon: "",
    color: ""
  }).then(response => console.log("External user added"))
    .catch(err => console.log(err));


  var inputString = await readFileAsync("./db/seeds.json", "utf8");
  var inputQuestions = JSON.parse(inputString);
  var answers = [];
  var correctIndex = 0;
  var seedQuestions = [];
  var questionType = "";
  for (let i = 0; i < inputQuestions.length; i++) {
    console.log("Input question: ", inputQuestions[i]);
    questionType = inputQuestions[i].type === "multiple" ? "mc" : "tf";
    if (inputQuestions[i].type === "boolean") {
      // handle true/false question
      answers[0] = "True";
      answers[1] = "False";
      answers[2] = "";
      answers[3] = "";
      correctIndex = inputQuestions[i].correct_answer === "True" ? 0 : 1;
    } else {
      // handle multiple choice question
      answers = [...inputQuestions[i].incorrect_answers];
      // randomly insert the correct answer into the answer array
      correctIndex = Math.floor(Math.random() * 4);
      answers.splice(correctIndex, 0, inputQuestions[i].correct_answer);
    }
    let seedQuestion = {
      question: inputQuestions[i].question,
      category: inputQuestions[i].category,
      difficulty: inputQuestions[i].difficulty,
      userId: 1,
      questionType: questionType,
      correctIndex: correctIndex,
      answer1: answers[0],
      answer2: answers[1],
      answer3: answers[2],
      answer4: answers[3]
    };
    console.log("Seed question: ", seedQuestion)


    db.Question.create(seedQuestion)
      .then((newQuestion) => {
        // do nothing
      })
      .catch((err) => console.log(err));
  }

};

loadSeeds();

