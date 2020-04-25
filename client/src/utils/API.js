import axios from "axios";

export default {
    getUser: (id) => {
        console.log("Get user reached");

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

    joinQuiz: (game, displayName, icon, color) => {
        return axios.post(`/api/join/${game}`, { displayName, icon, color })
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

    // getQuizbyCode: (game) => {
    //     console.log("==========getQuizbyCode=========")
    //     console.log(game);
    //     return axios.get(`/api/quizbycode/${game}`);
    // },

    getQuizCode: () => {
        console.log("==========getQuizCode=========");
        return axios.get('/api/getcode');
    },

    getUserData: (userId) => {
        return axios.get("/api/user/data/" + userId);
    },

    getUserQuestions: (userId) => {
        return axios.get("/api/user/questions/" + userId);
    },

    getCategories: () => {
        console.log("==========getCategories========");
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

    saveResponse: (game, displayName, icon, color, correct) => {
        console.log("======saveResponse======");
        return axios.post(`/api/quiz/response/${game}`, { displayName, icon, color, correct });
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