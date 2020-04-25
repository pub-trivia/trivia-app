import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useGameContext } from '../utils/GlobalState';
import PlayerIcon from '../components/PlayerIcons';
import Scoreboard from '../components/Scoreboard';
import API from '../utils/API';
import Button from '../components/Button';

const GameResults = () => {
    
    const [state, dispatch] = useGameContext();
    const [responded, setScoreboard] = useState('');
    const { game } = state;
    let history = useHistory();

    //this use effect should only run the first time
    useEffect(() => {
        if(localStorage.currentGame === game){
            getWinner();
        } else {
            history.push('/');
        }
    }, []);

    const getWinner = async () => {
        API.getScores(game)
            .then(result => {
                console.log("======getWinner scores returned======")
                console.log(result.data);
                setScoreboard(result.data);
                API.quizComplete(game);
            })
    };
    
    return (
        <div>
            <h2>The winner of { game } is:</h2>
            {responded ?
            <>
                <PlayerIcon icon={responded[0].icon} color={responded[0].color} />
                <h2>{responded[0].displayName}</h2>
                <Scoreboard users={responded }/>
                <Link to="/">
                    <Button type="button" text="NEW GAME" /> 
                </Link>
            </>
            : null}
        </div>
    )
}

export default GameResults;