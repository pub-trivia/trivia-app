import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import Timer from '../components/Timer';
import QText from '../components/QText';
import QResponse from '../components/QResponse';
import Scoreboard from '../components/Scoreboard';

import { useGameContext } from '../utils/GlobalState';
import API from '../utils/API';

let socket;


const Game = () => {
    const [state, dispatch] = useGameContext();
    const [users, setUsers] = useState('');

    let ENDPOINT = "http://localhost:3000"

    if(process.env.NODE_ENV === "production"){
        ENDPOINT = "https://pub-trivia.herokuapp.com"
    }
    
    const { game, name, icon, color } = state;
    const mockQuestion = {
        questionId: 1,
        question: "Which of the following is correct?",
        category: "History",
        difficulty: "easy",
        userId: 1,
        needsModeration: false,
        questionType: "mc",
        answer1: "Not this one",
        answer2: "Not this one",
        answer3: "This one!",
        answer4: "Not this one",
        correctIndex: 2,
        correctCount: 100,
        incorrectCount: 20
    }

    useEffect(() => {
        // socket = io(ENDPOINT);
        // console.log(socket, game, name, icon, color);
        // mocking questio
        API.getQuizbyCode(game)
            .then((result) => {
                console.log("=========getQuizbyCodeResult=======")
                console.log(result);
            }

            )
    }, []);

    return (
        <>
            <Timer />
            <QText />
            <QResponse />
            <Scoreboard />
        </>
    )
}

export default Game;