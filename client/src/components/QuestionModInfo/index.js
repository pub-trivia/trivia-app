import React from "react";
import './QuestionModInfo.css';

const QuestionModInfo = (props) => {

    return (
        <div className="question-card">
            <div className="question category">{props.category}:</div>
            <div className="question">{props.question}</div>
            <div className="button-bar">
                <span className="badge purple">{props.correct}/{props.total} Correct</span>
                <span className="badge blue">{props.needsModeration ? "Disabled" : "Active"}</span>
                <button className="edit-button" type="button"><i className="fas fa-pencil-alt"></i></button>
            </div>
        </div>
    );

};

export default QuestionModInfo;