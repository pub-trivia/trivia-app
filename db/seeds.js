const mysql = require("mysql");
require("dotenv").config();
const fs = require("fs");
const util = require("util");
const readFileAsync = util.promisify(fs.readFile);


var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASS,
  database: "pubtrivia",
});

connection.connect(function (err) {
  if (err) throw err;
  loadSeeds();
});

async function loadSeeds() {
  var inputString = await readFileAsync("./db/seeds.json", "utf8");
  var inputQuestions = JSON.parse(inputString);
  var answers = [];
  var correctIndex = 0;
  var seedQuestions = [];
  for (let i = 0; i < inputQuestions.length; i++) {
    console.log("Input question: ", inputQuestions[i]);
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
    let seedQuestion = [
      inputQuestions[i].question,
      inputQuestions[i].category,
      inputQuestions[i].difficulty,
      1,
      inputQuestions[i].type === "multiple" ? "mc" : "tf",
      correctIndex,
      ...answers,
    ];
    seedQuestions.push(seedQuestion);
  }
  let insertCommand =
    "INSERT INTO questions (question, category, difficulty, userId, questionType, correctIndex, answer1, answer2, answer3, answer4) VALUES ? ";
  connection.query(insertCommand, [seedQuestions], (err, res) => {
    if (err) {
      console.log(err);
    }
    // console.log(res);
  });
}
