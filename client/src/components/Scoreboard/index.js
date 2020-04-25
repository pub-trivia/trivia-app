import React, { useEffect } from 'react';
import PlayerIcon from '../PlayerIcons';
import './scoreboard.css';

const Scoreboard = (props) => {
    const { users } = props;

    useEffect(() => {
        console.log('use effect for scoreboard triggered');
        console.log(props.users);
    }, [users]);

    return (
        <div className="score-board">
            <div>
                <h2>SCOREBOARD</h2>
            </div>
            {users
                ? (
                    <div>
                        {users.map(({ displayName, icon, color, score }, index) => {
                            let iconPosition = `${score}%`;

                            return (
                                <div key={index} className="scores">
                                    <div className="player-name"> {displayName} </div>
                                    <div className="player-icon-container">
                                        <div className="player-icon-position" style={`left=${iconPosition}`}>
                                            <PlayerIcon icon={icon} color={color} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )

                : null}
        </div>
    )
}

export default Scoreboard;
