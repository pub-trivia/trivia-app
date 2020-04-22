import React, { useEffect, useReducer } from 'react';
import { ws } from '../socket';

import './timer.css';


const Timer = (props) => {
    const initialState = {seconds: 15};
    const { game } = props;

    const timerReducer = (state, action) => {
        switch(action.type) {
            case 'DECREMENT':
                return { seconds: state.seconds - 1};
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
                //when timer runs out, show correct response
                ws.emit('timerend', { game }, () => {});
            }}, 1000);
    });

    return (
        <div className="timertext">{state.seconds > 9 ? `00:${state.seconds}` : `00:0${state.seconds}`}</div>
    )
}

export default Timer;