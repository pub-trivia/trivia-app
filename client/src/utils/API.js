import axios from "axios";

export default {
    getUser: () => {
        console.log("Get user reached");
    },

    signUpUser: (name, email, pw, avatar, color) => {
        console.log("==========sign up user==========")
        console.log(name, email, pw, avatar, color)
    },

    loginUser: (email, pw) => {
        console.log("==========log in user==========")
        console.log(email, pw)
    },

    getQuizbyCode: (game) => {
        console.log("==========getQuizbyCode=========")
        console.log(game);
        return axios.get(`/api/quizbycode/${game}`);
    },

    createquestion: (question, category, difficulty, userId, questionType, answer1, answer2, answer3, answer4, correctIndex) => {
        console.log("===========create a question=========")
        console.log(question, category, difficulty, userId, questionType, answer1, answer2, answer3, answer4, correctIndex)
        return axios.post(`/api/createquestion`, {question, category, difficulty, userId, questionType, answer1, answer2, answer3, answer4, correctIndex});
    },
    
}