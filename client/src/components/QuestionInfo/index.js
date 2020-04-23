import React, { useEffect, useState, useRef } from "react";
import API from "../../utils/API";

const QuestionInfo = (props) => {

    // need the edit button to go to the screen to edit the question

    return (
        <div>
            <div>{props.category}:</div>
            <div>Difficulty: {props.difficulty}</div>
            <div>{props.question}</div>
            <span>{props.correct}/{props.total} Correct</span>
            <span>{props.needsModeration ? "Disabled" : "Active"}</span>
            <button>Edit</button>
        </div>
    );

};

export default QuestionInfo;
