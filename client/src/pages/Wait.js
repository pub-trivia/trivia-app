import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useHistory } from 'react-router-dom';

import WaitingRoom from '../components/WaitingRoom';
import Button from '../components/Button';
import { useGameContext } from '../utils/GlobalState';

let socket;

const Wait = () => {
    const [state, dispatch] = useGameContext();
    const [users, setUsers] = useState('');
    let ENDPOINT = "http://localhost:3000";
    let history = useHistory();

    if(process.env.NODE_ENV === "production"){
        ENDPOINT = "https://pub-trivia.herokuapp.com"
    }
    
    const { game, name, icon, color } = state;

    useEffect(() => {
        socket = io(ENDPOINT);
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

    useEffect(() => {
        socket.on("startGame", ({ game, users }) => {
            history.push('/game');
        })
    }, []);

    const handleClick = (event) => {
        event.preventDefault();
        socket.emit("allHere", { game }, () => {});
    }

    
    return (
        <div>
            <h1>You're in game: {state.game}</h1>
            <WaitingRoom users={users} />
            <Button type="submit" text="EVERYONE IS HERE" handleClick={(event) => handleClick(event)}/>
        </div>
    )
}

export default Wait;