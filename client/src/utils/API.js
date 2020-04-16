import axios from "axios";

export default {
    getUser: () => {
        console.log("Get user reached");
    },

    signUpUser: (name, email, pw, avatar, color) => {
        console.log("==========sign up user==========")
        console.log(name, email, pw, avatar, color)
        return axios.post("/api/signup", {displayName:name, email:email, password:pw, avatar:avatar, avatarColor:color })
    },

    loginUser: (email, pw) => {
        console.log("==========log in user==========")
        console.log(email, pw)
        return  axios.get("/api/login",{email:email,password:pw})
    },

    getQuizbyCode: (game) => {
        console.log("==========getQuizbyCode=========")
        console.log(game);
        return axios.get(`/api/quizbycode/${game}`);
    }
}