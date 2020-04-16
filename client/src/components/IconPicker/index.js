import React from 'react';
import './iconpicker.css';

const IconPicker = (props) => {
    return (
        <label>Icon
            <input placeholder="Select Icon" type="text" ref={props.iconRef} />
        </label>
    )
}

export default IconPicker;