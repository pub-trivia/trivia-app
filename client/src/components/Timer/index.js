import React, { useEffect, useState } from 'react';
import { ws } from '../socket';

import './timer.css';


const Timer = () => {
    const [timer, setTimer] = useState();
    //const [timeR, setTimeR] = useState();
    //const { timeLeft } = props;

    useEffect(() => {
        ws.on('updateTimer', ({ text }) => {
            console.log("=====updateTimer======");
            console.log(text);
            setTimer(text);
        })
    });

    return (
        <div className="timertext">{timer > 9 ? `00:${timer}` : `00:0${timer > -1 ? timer : "0"}`}</div>
    )
}

export default Timer;