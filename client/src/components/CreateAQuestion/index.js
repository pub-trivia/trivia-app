import React, { createRef, useRef, useState } from 'react';
import { ADD_QUESTION } from '../../utils/actions';
import Button from "../Button";
import Toggle from "../Toggle";

const CreateAQuestion = () => {
    const categoryRef = useRef();
    const questionRef = useRef();
    const difficultyref = useRef();
    const questionTypeRef = createRef();
    const answersRef = createRef();
    const correctRef = createRef();

    const [value, setValue] = useState(false);
    
    const handleSubmit = event => {
        alert("Question Saved!")
        
        // pass to API.createQuestion
        ({
            type: ADD_QUESTION,
            post: {
                category: categoryRef.current.value,
                question: questionRef.current.value,
                difficulty: difficultyref.current.value,
                questionType: questionTypeRef.current.value,
                answers: answersRef.current.value,
                correct: correctref.current.value
            }
        });
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
                        ref={topicRef} 
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