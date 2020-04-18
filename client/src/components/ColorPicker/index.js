import React, { forwardRef } from 'react';
import './colorpicker.css';

const ColorPicker = forwardRef((props, ref) => {
    return (
        <div className="color-picker">
            <h6>Color:</h6>
            <div className="color-choice">
                <input type="radio" name="color" id="green" value="#03E4AC" />
                <label htmlFor="green" className="green"></label>
            </div>

            <div className="color-choice">
                <input type="radio" name="color" id="blue" value="#04D5FB" />
                <label htmlFor="blue" className="blue"></label>
            </div>

            <div className="color-choice">
                <input type="radio" name="color" id="orange" value="#F7903E" />
                <label htmlFor="orange" className="orange"></label>
            </div>

            <div className="color-choice">
                <input type="radio" name="color" id="yellow" value="#FFD72F" />
                <label htmlFor="yellow" className="yellow"></label>
            </div>

            <div className="color-choice">
                <input type="radio" name="color" id="purple" value="#9665D8" />
                <label htmlFor="purple" className="purple"></label>
            </div>

            <div className="color-choice">
                <input type="radio" name="color" id="red" value="#F94141" />
                <label htmlFor="red" className="red"></label>
            </div>

            <div className="color-choice">
                <input type="radio" name="color" id="darkblue" value="#4481D8" />
                <label htmlFor="darkblue" className="darkblue"></label>
            </div>

            <div className="color-choice">
                <input type="radio" name="color" id="pink" value="#F96E99" />
                <label htmlFor="pink" className="pink"></label>
            </div>

            <div className="color-choice">
                <input type="radio" name="color" id="white" value="#FFFFFF" />
                <label htmlFor="white" className="white"></label>
            </div>

            <div className="color-choice">
                <input type="radio" name="color" id="gray" value="#9FA1A0" />
                <label htmlFor="gray" className="gray"></label>
            </div>
        </div>
    )
}
)

export default ColorPicker;
