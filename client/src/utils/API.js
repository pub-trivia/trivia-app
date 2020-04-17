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

    getquizCode: () => {
        console.log("==========getQuizCode=========");
        return axios.get('/api/getcode');
    },

    getCategories: () => {
        console.log("==========getCategories========");
        return axios.get('/api/categories');
    },

    saveQuiz: (userid, category, difficulty, questionCount, quizCode) => {
      
    }
}