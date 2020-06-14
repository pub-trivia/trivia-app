import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useGameContext } from '../utils/GlobalState';
import PlayerIcon from '../components/PlayerIcons';
import Scoreboard from '../components/Scoreboard';
import Button from '../components/Button';

const GameResults = () => {

    const [state, dispatch] = useGameContext();

    const { game, scores } = state;
    let history = useHistory();

    //this use effect should only run the first time
    useEffect(() => {
        if (localStorage.currentGame !== game || scores.length === 0) {
            history.push('/');
        } 
    }, []);

    return (
        <div className="results-page">
            <h2 className="winner">WINNER</h2>
            {scores.length !== 0 ?
                <>
                    <div className="winner">
                        <PlayerIcon icon={scores[0].icon} color={scores[0].color} />
                        <h2>{scores[0].displayName}</h2>
                    </div>
                    <div className="final-scores">
                        <Scoreboard users={scores} />
                    </div>
                    
                </>
                : null}
                <Link to="/">
                    <Button type="button" text="NEW GAME" />
                </Link>
        </div>
    )
}

export default GameResults;