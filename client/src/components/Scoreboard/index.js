import React, { useEffect } from 'react';
import PlayerIcons from '../PlayerIcons';
import './scoreboard.css';

const Scoreboard = (props) => {
    const { users } = props;
    
    useEffect(() => {
        console.log('use effect for scoreboard triggered');
        console.log(props.users);
    }, [users]);

    return (
        <div>
            <div>
                <h2>SCOREBOARD</h2>
            </div>
        { users
         ? (
            <div>
                <h2>
                    {users.map(({ name, icon, color }, index) => {
                        return (
                            <div key={index}>
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