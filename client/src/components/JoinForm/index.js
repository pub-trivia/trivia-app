import React, { useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useGameContext } from '../../utils/GlobalState';
import { ADD_PLAYER, CLEAR_GAME } from '../../utils/actions';
import API from '../../utils/API';
import Button from '../Button';
import { ws } from '../socket';
import IconPicker from '../IconPicker';
import ColorPicker from '../ColorPicker';


import "./JoinForm.css";

const JoinForm = () => {
    const [state, dispatch] = useGameContext();
    let gameRef = useRef();
    let nameRef = useRef();
    let history = useHistory();
    const { quizCode } = useParams();

    useEffect(() => {
        if(quizCode){
            gameRef.current.value = quizCode;
        } else if (state.game !== '') {
            gameRef.current.value = state.game;
        }
        nameRef.current.value = state.name;
    }, [state.name]);

    const handleSubmit = event => {
        event.preventDefault();
        let gameCode = gameRef.current.value.toUpperCase();
        let userName = nameRef.current.value.toUpperCase();
        API.validateQuiz(gameCode)
            .then(result =>{
                if (!result.data.text) {
                    localStorage.setItem('currentGame', gameCode);
                    dispatch({
                        type: ADD_PLAYER,
                        post: {
                            game: gameCode,
                            name: userName
                        }
                    });
                    dispatch({
                        type: CLEAR_GAME,
                        post: {
                            users: [],
                            scores: [],
                            responses: []
                        }
                    });
                    API.addPlayer(gameCode, state.id, userName, state.icon, state.color)
                        .then(result => {
                            console.log("==> result of API.addPlayer")
                            console.log(result);
                            if(result.data.error){
                                alert(result.data.error);
                            } else {
                                ws.emit('join', { game: gameCode, name: nameRef.current.value }, (user) => {
                                    console.log("==> result of emit.join")
                                    console.log(user)
                                    history.push("/wait");
                                })
                            }
                    
                        })
                } else {
                    //TODO: prettier errors in join form
                    alert(result.data.text);
                }
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
