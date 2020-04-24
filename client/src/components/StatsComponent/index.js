import React, { useEffect, useState, useRef } from "react";
import API from "../../utils/API";
import './stats.css';


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
        <div className="user-stats">
            <h2>YOUR STATS</h2>
            <div className="stats">
                <div className="stat">
                    <div>{gamesPlayed || 0}</div>
                    <h4>NUMBER OF GAMES</h4>
                </div>
                <div className="stat">
                    <div>{gamesWon || 0}</div>
                    <h4>NUMBER OF WINS</h4>
                </div>
                <div className="stat">
                    <div>{totalAnswers || 0}</div>
                    <h4>QUESTIONS PLAYED</h4>
                </div>
                <div className="stat">
                    <div>{correctAnswers || 0}</div>
                    <h4>CORRECT ANSWERS</h4>
                </div>
            </div>
        </div>
    );

};

export default StatsComponent;
