import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useGameContext } from '../../utils/GlobalState';
import { ADD_PLAYER } from '../../utils/actions';
import Button from '../Button';
import { ws } from '../socket';
import IconPicker from '../IconPicker';
import ColorPicker from '../ColorPicker';

import "./JoinForm.css";
import API from '../../utils/API';

const JoinForm = () => {
    const [state, dispatch] = useGameContext();
    let gameRef = useRef();
    let nameRef = useRef();
    let history = useHistory();

    useEffect(() => {
        console.log("In useEffect, state:", state);
        gameRef.current.value = state.game;
        nameRef.current.value = state.name;
        console.log("Check settings: ", gameRef.current, nameRef.current);
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        let gameCode = gameRef.current.value.toUpperCase();
        //TODO: Handle if the quiz code does not match an active quiz
        localStorage.setItem('currentGame', gameCode);
        dispatch({
            type: ADD_PLAYER,
            post: {
                game: gameCode,
                name: nameRef.current.value
            }
        });
        console.log("=====dispatch sent, state is now=====");
        console.log(state.game, state.name)
        //this is the first emit from the client
        //registers the user's socket to this game
        ws.emit('join', { game: gameCode, name: nameRef.current.value, icon: state.icon, color: state.color }, () => {
            //TODO: this should handle if someone is already using this name
        });
        //this pushes the player to the wait screen
        history.push("/wait");
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
