import React, { useState } from 'react';
import { ws } from '../socket';
import { useGameContext } from '../../utils/GlobalState';
import './qresponse.css';

const QResponse = (props) => {
    
    const { q, responses, correct } = props;
    const [state, dispatch] = useGameContext();
    const [selected, setSelected] = useState('');
    
    const { game, name } = state;

    const handleResponse = event => {
       let resp;
        setSelected(event.target.id);
        console.log("triggering socket for response");
        if(event.target.id == correct){
            resp = "correct";
        } else {
            resp = "incorrect";
        }
        ws.emit('response', { game, name, q, resp }, (result) => {
            //TODO: Use this to update who has responded and who has not
            console.log("=================emit response result===========");
            console.log(result);
        });
        }

    return (
        responses.map((resp, index) => {
            return (
                <button 
                    className={selected == {index} ? "gamebutton active" : "gamebutton"}
                    key={index} 
                    type='button'
                    id={index}
                    onClick={(event) => handleResponse(event)}>
                        {resp}
                </button>
            )
        })
    )
}

export default QResponse;