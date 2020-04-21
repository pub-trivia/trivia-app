import React from 'react';
import './qtext.css';

const QText = (props) => {
    return (
        <div className="qbox">
            <span className="qtext">{props.text}</span>
        </div>
    )
}

export default QText;