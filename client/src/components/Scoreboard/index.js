import React, { useEffect } from 'react';
import PlayerIcon from '../PlayerIcons';
import { useGameContext } from '../../utils/GlobalState';
import './scoreboard.css';

const Scoreboard = (props) => {

    const [state, dispatch] = useGameContext();
    const { users, scores, responses } = state;

    useEffect(() => {
        console.log('==> scoreboard useEffect triggered');
        console.log(scores);
    }, [scores]);

    return (
        <div className="score-board">
            <div>
                <h2>SCOREBOARD</h2>
            </div>
            {users
                ? (
                    <div>
                        {users.map(({ displayName, icon, color }, index) => {
                            let score = 0;
                            let resp = 'no-resp';

                            if (scores.length !== 0) {
                                let userscore = scores.filter(score => score.displayName === displayName);
                                score = userscore[0].score;
                            }
                            
                            var scoreTrackStyles = {
                                minWidth: '50px',    
                                width: `${score}%`
                            }

                            if(responses.length !== 0) {
                                let userresponse = responses.filter(response => response.displayName === displayName);
                                if (userresponse.length > 0){
                                    resp = 'resp';
                                }
                            }

                            return (
                                <div className="scores">
                                    <div className="player-section">
                                        <div className="player-name"> {displayName} </div>
                                        <div className={`player-icon-container ${resp}`}>
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
