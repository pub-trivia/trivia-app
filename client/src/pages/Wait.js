import React, { useState, useEffect } from 'react';
import { ws } from '../components/socket';
import { useHistory } from 'react-router-dom';

import WaitingRoom from '../components/WaitingRoom';
import Button from '../components/Button';
import { useGameContext } from '../utils/GlobalState';

const Wait = () => {
    const [state, dispatch] = useGameContext();
    const [users, setUsers] = useState('');
    let history = useHistory();
    
    const { game, name, icon, color } = state;

    useEffect(() => {
        ws.emit('join', { game, name, icon, color }, () => {});
    }, []);

    useEffect(() => {
        ws.on("gameData", ({ users }) => {
            setUsers(users);
        })

        ws.on("startGame", ({ game, users }) => {
            history.push('/game');
        })
    }, []);

    const handleClick = (event) => {
        event.preventDefault();
        ws.emit("allHere", { game }, () => {});
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