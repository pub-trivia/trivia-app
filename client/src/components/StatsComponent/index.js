import React, { useEffect, useState, useRef } from "react";
import API from "../../utils/API";

const StatsComponent = (props) => {

    const [gamesPlayed, setGamesPlayed] = useState(0);
    const [gamesWon, setGamesWon] = useState(0);
    const [totalAnswers, setTotalAnswers] = useState(0);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    useEffect(() => {
        console.log("In StatsComponent: ", props);
        API.getUserData(props.userId)
            .then(userData => {
                setGamesPlayed(userData.data[0].gamesPlayed);
                setGamesWon(userData.data[0].gamesWon);
                setTotalAnswers(userData.data[0].totalAnswers);
                setCorrectAnswers(parseInt(userData.data[0].correctAnswers));
            })
    },
        [gamesPlayed, gamesWon, totalAnswers, correctAnswers]);

    return (
        <div>
            <h2>YOUR STATS</h2>
            <div>NUMBER OF GAMES</div><div>{gamesPlayed}</div>
            <div>NUMBER OF WINS</div><div>{gamesWon}</div>
            <div>QUESTIONS PLAYED</div><div>{totalAnswers}</div>
            <div>CORRECT ANSWERS</div><div>{correctAnswers}</div>
        </div>
    );

};

export default StatsComponent;
