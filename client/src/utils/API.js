import axios from "axios";

export default {
    getUser: (id) => {
        return axios.get(`/api/getuser/${id}`);
    },

    signUpUser: (name, email, pw, icon, color) => {
        return axios.post("/api/signup", { displayName: name, email, password: pw, icon, color })
    },

    loginUser: (email, password) => {
        return axios.post("/api/login", { email, password })
    },

    message: (quizCode, phoneNums) => {
        return axios.post("/api/messages", { quizCode, phoneNums });
    },

    startQuiz: (game) => {
        return axios.post(`/api/quiz/start/${game}`);
    },

    createquestion: (question, category, difficulty, userId, questionType, answer1, answer2, answer3, answer4, correctIndex) => {
        return axios.post(`/api/createquestion`, {question, category, difficulty, userId, questionType, answer1, answer2, answer3, answer4, correctIndex});
    },

    getAllPlayers: (game) => {
        return axios.get(`/api/quiz/users/${game}`);
    },

    getQuizCode: () => {
        return axios.get('/api/getcode');
    },

    getUserData: (userId) => {
        return axios.get("/api/user/data/" + userId);
    },

    getUserQuestions: (userId) => {
        return axios.get("/api/user/questions/" + userId);
    },

    getCategories: () => {
        return axios.get('/api/categories');
    },

    saveQuiz: (userId, category, difficulty, questionCount, quizCode) => {
        console.log("==========saveQuiz========");
        return axios.post("/api/quiz", { userId, category, difficulty, questionCount, quizCode });
    },

    getQuestion: (game) => {
        console.log("=========getQuestion===========");
        console.log("game: " + game)
        return axios.get(`/api/quiz/question/${game}`);
    },

    saveResponse: (game, userId, displayName, icon, color, questionId, correct) => {
        return axios.post(`/api/quiz/response/${game}`, { userId, displayName, icon, color, questionId, correct });
    },

    getScores: (game) => {
        console.log("=======getScores=====");
        return axios.get(`/api/quiz/scores/${game}`);
    },

    completeQuestion: (game) => {
        console.log("=======completeQuestion======");
        return axios.post(`/api/quiz/store/${game}`);
    },

    quizComplete: (game) => {
        console.log("===========quizComplete========");
        return axios.post(`/api/quiz/end/${game}`);
    },

    getResponses: (game) => {
        console.log("===========getResponses========");
        return axios.get(`/api/quiz/responses/${game}`);
    }

}