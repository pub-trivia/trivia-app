import React from "react";
import { decodeHTML } from 'entities';
import './QuestionModInfo.css';

const QuestionModInfo = (props) => {

    return (
        <div key={props.questionId} className="question-card row">
            <div className="col-2">
                <button className="edit-button" id={props.questionId} type="button"><i className="fas fa-pencil-alt"></i></button>
            </div>
            
            <div className="col-10">
                <div className="question">{decodeHTML(props.question)}</div>
                <div className="badge-row">
                    <div className="badge blue">{props.category}</div>
                    <div className="badge purple">{props.difficulty}</div>
                </div>
            </div> 
        </div>
    );

};

export default QuestionModInfo;