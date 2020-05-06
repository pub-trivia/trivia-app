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

                            if (!score) {
                                score = 0;
                            }
                            
                            var scoreTrackStyles = {
                                minWidth: '50px',    
                                width: `${score}%`
                            }

                            return (
                                <div className="scores">
                                    <div className="player-section">
                                        <div className="player-name"> {displayName} </div>
                                        <div className="player-icon-container">
                                            <div className="player-icon-position" style={scoreTrackStyles}>
                                                <PlayerIcon icon={icon} color={color} />
                                            </div>
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
