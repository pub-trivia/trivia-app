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
        <div class="score-board">
            <div>
                <h2>SCOREBOARD</h2>
            </div>
            {users
                ? (
                    <div>
                        {users.map(({ displayName, icon, color, score }, index) => {
                            let scoreTrackStyles = {
                                width: { score },
                                minWidth: '50px',
                            };

                            return (
                                <div class="scores">
                                    <div class="player-section">
                                        <div class="player-name"> {displayName} </div>
                                        <div class="player-icon-container">
                                            <div class="player-icon-position" style={scoreTrackStyles}>
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