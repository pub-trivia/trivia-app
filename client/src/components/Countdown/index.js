import React, { useEffect } from 'react';

import './countdown.css';


const Countdown = (props) => {
    const { timer } = props;

    useEffect(() => {
        console.log("==> get ready to begin")
    }, [timer]);

    return (
        <>
            <h2>Your game will begin in ...</h2>
            <div className="countdowntext">{timer}</div>
        </>
    )
}

export default Countdown;