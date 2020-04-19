import React, { useState, useEffect } from 'react';
import PlayerIcons from '../PlayerIcons';
import { ws } from '../socket';
import './scoreboard.css';

const Scoreboard = () => {
    const [users, setUsers] = useState('');

    useEffect(() => {
        ws.on("respData", ({ users }) => {
            console.log("=============socket received=========");
            console.log(users);
            setUsers(users);
        });
        
    }, []);

    return (
        <div>
            <div>
                <h2>SCOREBOARD</h2>
            </div>
        { users
         ? (
            <div>
                <h2>
                    {users.map(({ name, icon, color }) => {
                        return (
                            <div key={name}>
                                <PlayerIcons icon={icon} color={color} /> {name}
                            </div>
                        )
                    })}
                </h2>
            </div>
         )
        
        : null }
    </div>
    )
}

export default Scoreboard;