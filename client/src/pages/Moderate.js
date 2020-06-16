import React, { useEffect, useState } from "react";
import QuestionModInfo from "../components/QuestionModInfo";
import API from "../utils/API";


function Moderate() {
    const [modQues, setQuestions] = useState();
    console.log("Moderation page reached")

    useEffect(() => {
        
        API.getModerationQueue()
            .then(result => {
                console.log("==> results of getModerationQueue")
                console.log(result);
                setQuestions(result);
            })
    }, []);

    //   const handleFormSubmit = event => {
    //       event.preventDefault();

    //       if (!emailRef.current.value) {
    //           return;
    //       }

    //       API.updateUser(id, nameRef.current.value, emailRef.current.value, oldpwRef.current.value, newpwRef.current.value)
    //           .then((res) => {
    //               console.log("==> updateUser returned");
    //               console.log(res);
    //               const { token } = res.data;
    //               processToken(token);
    //           })
    //           .catch(err => {
    //               console.log(err);
    //               alert("The old password you entered is incorrect. Please try again.");
    //           });
    //   }

    return (
        <div>
            <div className="row">
                {modQues ? 
                    <div className="col">
                        <h2>QUESTIONS AWAITING MODERATION</h2>
                        {modQues.map((question) => {
                            return (
                                <>
                                    <QuestionModInfo
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
                : <h2>Hooray! There are no questions to moderate.</h2>}
            </div>
        </div>
    );
}

export default Moderate;