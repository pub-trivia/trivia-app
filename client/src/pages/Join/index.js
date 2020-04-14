import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import API from '../../utils/API';
import { useGameContext } from '../../utils/GlobalState';
import { ADD_PLAYER } from '../../utils/actions';

import './Join.css';

const Join = () => {
    const gameRef = useRef();
    const nameRef = useRef();
    const iconRef = useRef();
    const colorRef = useRef();
    const [state, dispatch] = useGameContext();
    let history = useHistory();

    const handleSubmit = event => {
        //event.preventDefault();
        //TODO: Add API call to add user to game
        //Then update state to include the player

        dispatch({
            type: ADD_PLAYER,
            post: {
                game: gameRef.current.value,
                name: nameRef.current.value,
                icon: iconRef.current.value,
                color: colorRef.current.value
            }
        });
        history.push('/game');
    }

    return (
        <div>
            <h1>Join a game!</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
                <input placeholder="Enter game code" type="text" ref={gameRef} />
                <input placeholder="Display Name" type="text" ref={nameRef} />
                <input placeholder="Select Icon" type="text" ref={iconRef} />
                <input placeholder="Select Color" type="text" ref={colorRef} />
                <button type="submit">Join Now</button>
            </form>
        </div>
    )
}

export default Join;