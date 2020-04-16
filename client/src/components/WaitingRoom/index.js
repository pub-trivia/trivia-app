import React from 'react';
import Button from '../Button';
import PlayerIcons from '../PlayerIcons';
import { useHistory } from 'react-router-dom';

const WaitingRoom = ({ users }) => {
    let history = useHistory();

    const handleClick = (event) => {
        event.preventDefault();

        history.push('/game');
    }

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
        
        <Button type="submit" text="EVERYONE IS HERE" handleClick={(event) => handleClick(event)}/>
    </div>
    )
}

export default WaitingRoom;