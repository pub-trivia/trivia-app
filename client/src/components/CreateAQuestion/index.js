import React, { createRef, useRef, useState } from 'react';
import API from '../utils/API';
import Button from "../Button";
import Toggle from "../Toggle";

const CreateAQuestion = () => {
    const categoryRef = useRef();
    const questionRef = useRef();
    const difficultyref = useRef();
    const userIdref = userIdref();
    const questionTypeRef = createRef();
    const answer1Ref = createRef();
    const answer2Ref = createRef();
    const answer3Ref = createRef();
    const answer4Ref = createRef();
    const correctIndexRef = createRef();

    const [value, setValue] = useState(false);
    
    const handleSubmit = event => {
        alert("Question Saved!")
        API.createquestion(
            questionRef.current.value,
            categoryRef.current.value,
            difficultyref.current.value,
            userIdRef.current.value,
            questionTypeRef.current.value,
            answer1Ref.current.value,
            answer2Ref.current.value,
            answer3Ref.current.value,
            answer4Ref.current.value,
            correctIndexref.current.value
        )
            .then((res) => {
        const { token } = res.data;
        processToken(token);
    })
       deleteFields = () => {
        this.setState({
            
        })
       };
    }

    return (
        <div>
            <form onSubmit={(event) => handleSubmit(event)}>
                <h1>Create a Question</h1>
                <label>Topic
                    <input 
                        placeholder="History" 
                        type="dropdown" 
                        ref={categoryRef} 
                    />
                </label>
                <label>Question
                    <input 
                        placeholder="Which president served the shortest time in office?" 
                        type="text" 
                        ref={questionRef} 
                    />
                </label>
                <label>Type of Question:
                    <Toggle 
                    isOn={value}
                    handleToggle={() => setValue(!value)}
                    />
                </label>
                {/* <label>Options: Please Select the correct answer
                    <input 
                        type="text" 
                        ref={answersRef} 
                    />
                </label>
                <label>Options: Please Select the correct answer
                    <input 
                        type="text" 
                        ref={answersRef} 
                    />
                    <input 
                        type="text" 
                        ref={answersRef} 
                    />
                    <input 
                        type="text" 
                        ref={answersRef} 
                    />
                    <input 
                        type="text" 
                        ref={answersRef} 
                    />
                </label>
                <label>Options: Please Select the correct answer
                    <input 
                        type="checkbox" 
                        ref={correctRef} 
                    />
                </label> */}
                </form>
            <Button type="button" text="SAVE QUESTION" /> 
        </div>
    )

}

export default CreateAQuestion;