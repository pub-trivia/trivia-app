import React, { useEffect, useState } from 'react';

import { useGameContext } from '../utils/GlobalState';
import PlayerIcon from '../components/PlayerIcons';
import Scoreboard from '../components/Scoreboard';
import API from '../utils/API';

const GameResults = () => {

    const [state, dispatch] = useGameContext();
    const [responded, setScoreboard] = useState('');
    const { game } = state;

    //this use effect should only run the first time
    useEffect(() => {
        getWinner();
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
        <div className="results-page">
            <h2>The winner of {game} is:</h2>
            {responded ?
                <>
                    <div className="winner">
                        <PlayerIcon icon={responded[0].icon} color={responded[0].color} />
                        <h2>{responded[0].displayName}</h2>
                    </div>
                    <div className="final-scores">
                        <Scoreboard users={responded} />
                    </div>
                </>
                : null}
        </div>
    )
}

export default GameResults;