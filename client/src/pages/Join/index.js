import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
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
    }

    return (
        <div>
            <h1>Join a game!</h1>
            <input placeholder="Enter game code" type="text" ref={gameRef} />
            <input placeholder="Display Name" type="text" ref={nameRef} />
            <input placeholder="Select Icon" type="text" ref={iconRef} />
            <input placeholder="Select Color" type="text" ref={colorRef} />
            <Link onClick={(event) => handleSubmit(event)} to='/game'>
                <button type="submit">Join Now</button>
            </Link>
        </div>
    )
}

export default Join;