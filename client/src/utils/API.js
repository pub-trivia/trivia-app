import axios from "axios";

export default {
    getUser: (id) => {
        return axios.get(`/api/getuser/${id}`);
    },

    signUpUser: (name, email, pw, icon, color) => {
        return axios.post("/api/signup", { displayName: name, email, password: pw, icon, color })
    },

    updateUser: (id, name, email, oldpw, newpw) => {
        return axios.post(`/api/update/${id}`, { displayName: name, email, password: oldpw, newpw })
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

    createTFQuestion: (question, category, difficulty, userId, correctIndex) => {
        return axios.post(`/api/createtfquestion`, { question, category, difficulty, userId, correctIndex });
    },

    createMCQuestion: (question, category, difficulty, userId, answer1, answer2, answer3, answer4) => {
        return axios.post(`/api/createmcquestion`, { question, category, difficulty, userId, answer1, answer2, answer3, answer4 });
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

    saveResponse: (game, userId, displayName, icon, color, questionId, correct) => {
        return axios.post(`/api/quiz/response/${game}`, { userId, displayName, icon, color, questionId, correct });
    },

    validateQuiz: (quizCode) => {
        return axios.get(`/api/quiz/validate/${quizCode}`);
    },

    addPlayer: (quizCode, userId, displayName, icon, color) => {
        return axios.post(`/api/quiz/player/${quizCode}`, { userId, displayName, icon, color });
    }

}