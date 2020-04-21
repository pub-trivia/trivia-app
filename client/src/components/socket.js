import io from 'socket.io-client';


let ENDPOINT = "http://localhost:3000";

if(process.env.NODE_ENV === "production"){
    ENDPOINT = "https://pub-trivia.herokuapp.com"
}

const ws = io(ENDPOINT);  

export { ws };
