import React, { useEffect, useState, useRef } from "react";
import API from "../../utils/API";
import QuestionInfo from "../QuestionInfo";

const QuestionsSummary = (props) => {

    const [questions, setQuestions] = useState([]);

    let test = questions.map(question => question);
    console.log("Questions map:", test);

    useEffect(() => {
        console.log("In QuestionsSummary: ", props);
        API.getUserQuestions(props.userId)
            .then(userQuestions => {
                console.log(userQuestions.data);
                setQuestions(userQuestions.data);
            });
    },
        []);

    return (
        <div>
            <h2>YOUR QUESTIONS</h2>
            {questions.map((question) =>
                <QuestionInfo
                    category={question.category}
                    question={question.question}
                    difficulty={question.difficulty}
                    used={question.answers}
                    correct={question.correctAnswers}
                    needsModeration={question.needsModeration}
                    questionId={question.questionId}
                />
            )}
            <div>
                <button>Create New Question</button>
            </div>
        </div>
    );

};

export default QuestionsSummary;
