import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import Timer from '../components/Timer';
import Question from '../components/Question';
import Responses from '../components/Responses';
import Scoreboard from '../components/Scoreboard';

import { useGameContext } from '../utils/GlobalState';

let socket;


const Game = () => {
    const [state, dispatch] = useGameContext();
    const [users, setUsers] = useState('');

    let ENDPOINT = "http://localhost:3000"

    if(process.env.NODE_ENV === "production"){
        ENDPOINT = "https://pub-trivia.herokuapp.com"
    }
    
    const { game, name, icon, color } = state;

    useEffect(() => {
        socket = io(ENDPOINT);
        console.log(socket, game, name, icon, color);
    }, []);

    return (
        <>
            <Timer />
            <Question />
            <Responses />
            <Scoreboard />
        </>
    )
}

export default Game;