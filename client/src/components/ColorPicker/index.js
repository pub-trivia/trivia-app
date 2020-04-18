import React from 'react';
import { SET_COLOR } from '../../utils/actions';
import { useGameContext } from '../../utils/GlobalState';
import './colorpicker.css';

const ColorPicker = () => {
    const [state, dispatch] = useGameContext();

    const colorOpts = [
        { desc: "green", hex: "#03E4AC" },
        { desc: "blue", hex: "#04D5FB" },
        { desc: "orange", hex: "#F7903E" },
        { desc: "yellow", hex: "#FFD72F" },
        { desc: "purple", hex: "#9665D8" },
        { desc: "red", hex: "#F94141" },
        { desc: "darkblue", hex: "#4481D8" },
        { desc: "pink", hex: "#F96E99" },
        { desc: "white", hex: "#FFFFFF" },
        { desc: "gray", hex: "#9FA1A0" }]

    const toggleColor = event => {
        dispatch({
            type: SET_COLOR,
            post: {
                color: event.target.value
            }
        })
    }

    return (
        <div className="color-picker">
            <h6>Color:</h6>
            {colorOpts.map(color => {
                return(
                    <div className="color-choice" key={color.desc}>
                        <input type="radio" name="color" id={color.desc} value={color.hex} onClick={event => toggleColor(event)} />
                        <label htmlFor={color.desc} className={color.desc}></label>
                    </div>
                    )  
                })
            }
        </div>
    )
}

export default ColorPicker;
