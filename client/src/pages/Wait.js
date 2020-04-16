import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

import WaitingRoom from '../components/WaitingRoom';
import { useGameContext } from '../utils/GlobalState';

let socket;

const Wait = () => {
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
        socket.emit('join', { game, name, icon, color }, () => {});

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT]);

    useEffect(() => {
        socket.on("gameData", ({ users }) => {
            setUsers(users);
        });
    }, []);

    return (
        <div>
            <h1>You're in game: {state.game}</h1>
            <WaitingRoom users={users} />
        </div>
        
    )
}

export default Wait;