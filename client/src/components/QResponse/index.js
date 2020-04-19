import React, { useState, useEffect } from 'react';
import { ws } from '../socket';
import { useGameContext } from '../../utils/GlobalState';
import './qresponse.css';

const QResponse = (props) => {
    
    const { responses, correct } = props;
    const [state, dispatch] = useGameContext();
    const [selected, setSelected] = useState('');
    
    const { game, name, icon, color } = state;

    let prevSelected;
    
    useEffect(() => {
        console.log(`use effect selected: ${selected}`);
        if(selected == correct){
            console.log("CORRECT!");
        } else {
            console.log("INCORRECT");
        }
    }, [selected]);

    const handleResponse = event => {
        console.log("================response selected=============")
        console.log(event.target.id);
        if(!selected){
            console.log("triggering socket for first response");
            ws.emit('response', { game, name, icon, color }, () => {});
        }
        setSelected(event.target.id);  
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