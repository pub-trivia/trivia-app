import React, { useEffect, useReducer } from 'react';

import './timer.css';

const Timer = () => {
    const initialState = {seconds: 15};

    const timerReducer = (state, action) => {
        switch(action.type) {
            case 'DECREMENT':
                return { seconds: state.seconds -1};
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(timerReducer, initialState);

    const handleDecrease = () => {
        dispatch({ type: 'DECREMENT'});
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (state.seconds > 0){
                handleDecrease();
            } else {
                clearTimeout(timer);
                //TODO: when timer runs out, show correct response
            }}, 1000);
    });

    return (
        <h2>{state.seconds > 9 ? `00:${state.seconds}` : `00:0${state.seconds}`}</h2>
    )
}

export default Timer;