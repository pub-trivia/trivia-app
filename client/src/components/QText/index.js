import React from 'react';
import { decodeHTML } from 'entities';
import './qtext.css';

const QText = (props) => {
    return (
        <div className="qbox">
            <span className="qtext">{decodeHTML(props.text)}</span>
        </div>
    )
}

export default QText;