import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useGameContext } from '../../utils/GlobalState';
import { ADD_PLAYER } from '../../utils/actions';
import Button from '../Button';
import IconPicker from '../IconPicker';
import ColorPicker from '../ColorPicker';

import "./JoinForm.css";
import API from '../../utils/API';

const JoinForm = () => {
    const gameRef = useRef();
    const nameRef = useRef();
    const [state, dispatch] = useGameContext();
    let history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();
        //TODO: Handle if the quiz code does not match an active quiz
        localStorage.setItem('currentGame', gameRef.current.value);
        //TODO: Handle if the displayName selected is not unique for this quiz
        API.joinQuiz(
            gameRef.current.value, 
            nameRef.current.value, 
            state.icon, 
            state.color)
        .then(result => {
            dispatch({
                type: ADD_PLAYER,
                post: {
                    game: gameRef.current.value,
                    name: nameRef.current.value
                }
            });
            history.push("/wait");
        }) 
    };

    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>

                <label>
                    Enter Game Code:
          <input placeholder="Enter game code" type="text" ref={gameRef} />
                </label>
                <label>
                    Name
          <input placeholder="Display Name" type="text" ref={nameRef} />
                </label>
                <h4>Select a profile icon and color</h4>
                <IconPicker />
                <ColorPicker />
                <Button type="submit" text="Join Now" />
            </form>
        </div>
    );
};

export default JoinForm;
