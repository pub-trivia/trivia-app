import React, { createRef, useRef, useState } from 'react';
import API from '../../utils/API';
// import Cat from "../Cat";
// import Toggle from "../Toggle";
import Button from "../Button";
// const [state, dispatch] = useGameContext();
// const [categories] = useState([]);
// import processToken from "../../utils/setAuthToken";

const CreateAQuestion = () => {
    const categoryRef = createRef();
    const questionRef = useRef();
    const diffRef = useRef();
    const userIdRef = useRef();
    const questionTypeRef = useRef();
    const answer1Ref = useRef();
    const answer2Ref = useRef();
    const answer3Ref = useRef();
    const answer4Ref = useRef();
    const correctIndexRef = useRef();

    const [value, setValue] = useState(false);
    
    const handleSubmit = event => {
        event.preventdefault()
        API.createquestion(
            categoryRef.current.value,
            questionRef.current.value,
            diffRef.current.value,
            userIdRef.current.value,
            questionTypeRef.current.value,
            answer1Ref.current.value,
            answer2Ref.current.value,
            answer3Ref.current.value,
            answer4Ref.current.value,
            correctIndexRef.current.value
        )
        .then(res => {
            alert("Question Saved")
        })
    };

    return (
        <div>
             <h1>Create A Question Page</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
                {/* <Cat ref={categoryRef}/>
                <label>Question
                    <input 
                        placeholder="Which president served the shortest time in office?" 
                        type="text" 
                        ref={questionRef} 
                    />
                </label> */}
        {/* <h1>Create A Question Page</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
            <label htmlFor="catPicker"><h6>Select a Topic</h6>
          <select name="catPicker" ref={categoryRef}
          >
            {categories.map((item, index) => (
              <option value={item} key={index} >{item}</option>
            ))}
          </select>
        </label> */}
        {/* <label><h6>Difficulty</h6></label>
        <select name="difficulty" ref={diffRef}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select> */}
                <label>Question
                    <input 
                        placeholder="Which president served the shortest time in office?" 
                        type="text" 
                        ref={questionRef} 
                    />
                </label>
                {/* <label>Type of Question:
                    <Toggle 
                    let isOn={value}
                    handleToggle={() => setValue(!value)}
                    />
                </label>
                {isOn ? 
                <div>
                <label>Options: Please Select the correct answer
                    <input 
                        type="text" 
                        ref={answer1Ref} 
                    />
                </label>
                <label>Options: Please Select the correct answer
                    <input 
                        type="checkbox" 
                        ref={answer2Ref} 
                    />
                </label>
                </div>
                :
                <div>
                <label>Options: Please Select the correct answer
                    <input 
                        type="text" 
                        ref={answer1Ref} 
                    />
                    <input 
                        type="text" 
                        ref={answer2Ref} 
                    />
                    <input 
                        type="text" 
                        ref={answer3Ref} 
                    />
                    <input 
                        type="text" 
                        ref={answer4Ref} 
                    />
                </label>
                </div> } */}
                </form>
            <Button type="submit" text="SAVE QUESTION" /> 
        </div>
    )

}

export default CreateAQuestion;