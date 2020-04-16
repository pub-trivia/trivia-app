import React, { forwardRef } from 'react';
import './iconpicker.css';

const IconPicker = forwardRef((props, ref) => {
    return (
        <label>Icon
            <input placeholder="Select Icon" type="text" ref={ref} />
        </label>
        )
    }
)

export default IconPicker;