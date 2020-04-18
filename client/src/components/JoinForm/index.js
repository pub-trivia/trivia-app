import React, { createRef, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useGameContext } from "../../utils/GlobalState";
import { ADD_PLAYER } from "../../utils/actions";


import Button from "../Button";
import IconPicker from "../IconPicker";
import ColorPicker from "../ColorPicker";

import "./JoinForm.css";

const JoinForm = () => {
    const gameRef = useRef();
    const nameRef = useRef();
    const iconRef = createRef();
    const colorRef = createRef();
    const [state, dispatch] = useGameContext();
    let history = useHistory();

    const handleSubmit = (event) => {
        //event.preventDefault();
        //TODO: Add API call to add user to game
        //Then update state to include the player

        dispatch({
            type: ADD_PLAYER,
            post: {
                game: gameRef.current.value,
                name: nameRef.current.value,
                icon: iconRef.current.value,
                color: colorRef.current.value,
            },
        });
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
                <IconPicker ref={iconRef} />
                <ColorPicker ref={colorRef} />
                <Button type="submit" text="Join Now" />
            </form>
        </div>
    );
};

export default JoinForm;
