import React from 'react';
import { decodeHTML } from 'entities';
import './qtext.css';
import API from '../../utils/API';


const QText = (props) => {
    
    const reportQuestion = (event) => {
        event.preventDefault();
        console.log("==> report questionId");
        console.log(props.id);
        API.reportQuestion(props.id)
            .then(result => {
                //TODO: handle reported questions in quiz
            })
    }

    return (
        <div className="qbox">
            <span className="qtext">{decodeHTML(props.text)}</span>
            <button className="report-button" type="button" onClick={(event) => reportQuestion(event)}><i className="fas fa-exclamation"></i></button>
        </div>
    )
}

export default QText;