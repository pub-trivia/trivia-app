import React from 'react';

const Button = (props) => {
    return (
        <button type={props.type ? props.type : 'button'} 
            onClick={props.handleClick ? (event) => props.handleClick(event) : null}>
                {props.text}
        </button>
    )
    
}

export default Button;