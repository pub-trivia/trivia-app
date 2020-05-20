import React, { useEffect, useState } from "react";
import API from "../../utils/API";
import QuestionInfo from "../QuestionInfo";
import { useGameContext } from '../../utils/GlobalState';

const QuestionsSummary = (props) => {

    const [questions, setQuestions] = useState([]);
    const [state, dispatch] = useGameContext();

    let test = questions.map(question => question);
    console.log("Questions map:", test);

    useEffect(() => {
        console.log("In QuestionsSummary: ", props);
        API.getUserQuestions(state.id)
            .then(userQuestions => {
                console.log(userQuestions.data);
                setQuestions(userQuestions.data);
            });
    },
        []);

    return (
        <div>
            <h2>YOUR QUESTIONS</h2>
            {questions.map((question) => {
                return (
                    <>
                        <QuestionInfo
                            key={question.questionId}
                            category={question.category}
                            question={question.question}
                            difficulty={question.difficulty}
                            total={question.totalCount}
                            correct={question.correctCount}
                            needsModeration={question.needsModeration}
                            questionId={question.questionId}
                        />
                    </>
                )
            })}
        </div>
    );

};

export default QuestionsSummary;
