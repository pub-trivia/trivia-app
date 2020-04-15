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
    }
}