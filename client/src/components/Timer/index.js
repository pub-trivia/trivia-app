import React, { useEffect, useState } from 'react';
import { ws } from '../socket';

import './timer.css';


const Timer = () => {
    const [timer, setTimer] = useState();

    useEffect(() => {
        ws.on('updateTimer', ({ text }) => {
            setTimer(text);
        })
    }, []);

    return (
        <div className="timertext">{timer > 9 ? `00:${timer}` : `00:0${timer > -1 ? timer : "0"}`}</div>
    )
}

export default Timer;