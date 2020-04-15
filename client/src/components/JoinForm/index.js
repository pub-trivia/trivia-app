import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useGameContext } from '../../utils/GlobalState';
import { ADD_PLAYER } from '../../utils/actions';

import Button from '../Button';

import './JoinForm.css';

const JoinForm = () => {
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
            <form onSubmit={(event) => handleSubmit(event)}>
                <label>Enter Game Code:
                    <input placeholder="Enter game code" type="text" ref={gameRef} />
                </label>
                <label>Name:
                    <input placeholder="Display Name" type="text" ref={nameRef} />
                </label>
                <h4>Select a profile icon and color:</h4>
                <label>Icon:
                    <input placeholder="Select Icon" type="text" ref={iconRef} />
                </label>
                <label>Color:
                    <input placeholder="Select Color" type="text" ref={colorRef} />
                    {/* color values: [#03E4AC, #04D5FB, #F7903E, #FFD72F, #9665D8, #F94141, #4481D8, #F96E99, #FFFFFF, #9FA1A0] */}
                </label>
                <Button type="submit" text="Join Now" />
                {/* <button type="submit">Join Now</button> */}
            </form>
        </div>
    )
}

export default JoinForm;