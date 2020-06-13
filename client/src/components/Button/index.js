import React from 'react';
import './button.css';

const Button = (props) => {
    console.log("==> adding button with id:")
    console.log(props.id)
    return (
        <button type={props.type ? props.type : 'button'}
            className={props.className ? props.className : null}
            onClick={props.handleClick ? (event) => props.handleClick(event) : null}
            id={props.id ? props.id : 0}
            key={props.id ? props.id : null}>
            {props.text}
        </button>
    )

}

export default Button;