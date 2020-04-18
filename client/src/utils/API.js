import axios from "axios";

export default {
    getUser: () => {
        console.log("Get user reached");
    },

    signUpUser: (name, email, pw, icon, color) => {

        return axios.post("/api/signup", {displayName:name, email, password:pw, icon, color })
    },

    loginUser: (email, password) => {
        
        return axios.post("/api/login", {email, password})
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