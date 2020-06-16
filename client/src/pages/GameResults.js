import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ADD_GAME } from '../utils/actions';
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

    const handleNew = (event) => {
        //remove currentGame from localstorage
        localStorage.removeItem('currentGame');
        //remove currentGame from state
        dispatch({
            type: ADD_GAME,
            post: {
                game: ''
            }
        });
        history.push('/');
    }
    
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
            <Button type="button" handleClick={(event) => handleNew(event)} text="NEW GAME" />
        </div>
    )
}

export default GameResults;