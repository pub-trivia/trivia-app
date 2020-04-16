import React from 'react';
import PlayerIcons from '../PlayerIcons';

import './WaitingRoom.css';

const WaitingRoom = ({ users }) => {
    

    return (
        <div>
            <div>
                <h1>Waiting for your Group...</h1>
            </div>
        { users
         ? (
            <div>
                <h2>
                    {users.map(({ name, icon, color }) => {
                        return (
                            <div key={name}>
                                <PlayerIcons icon={icon} color={color} /> {name} has joined
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

export default WaitingRoom;