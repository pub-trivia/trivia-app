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
    }
}