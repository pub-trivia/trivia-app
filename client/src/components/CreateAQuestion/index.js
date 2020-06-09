import React, { createRef, useRef, useState, useEffect } from 'react';
import API from '../../utils/API';
// import Cat from "../Cat";
// import Toggle from "../Toggle";
import Button from "../Button";
import './CreateAQuestion.css';
import { useGameContext } from "../../utils/GlobalState";
// const [categories] = useState([]);
// import processToken from "../../utils/setAuthToken";

const CreateAQuestion = () => {
    const [state, dispatch] = useGameContext();
    const categoryRef = createRef();
    const questionRef = useRef();
    const diffRef = useRef();
    // const userIdRef = useRef();
    const questionTypeRef = useRef();
    const answer1Ref = useRef();
    const answer2Ref = useRef();
    const answer3Ref = useRef();
    const answer4Ref = useRef();
    const correctIndexRef = useRef();
    const [categories, setCategories] = useState([]);

    let userId = state.id;

    const handleSubmit = event => {
        event.preventdefault()
        console.log("got here");
        API.createquestion(
            userId,
            categoryRef.current.value,
            questionRef.current.value,
            diffRef.current.value,
            questionTypeRef.current.value,
            answer1Ref.current.value,
            answer2Ref.current.value,
            answer3Ref.current.value,
            answer4Ref.current.value,
            correctIndexRef.current.value
        )
        console.log("results: ")
            .then(results =>
                alert("Question Saved")
            )
            .catch(err => console.log("Error: ", err));
    };

    useEffect(() => {
        API.getCategories()
            .then(results => setCategories(results.data));
    }, []);

    return (
        <div>
            <h2>Create Your Own Question</h2>
            <form onSubmit={(event) => handleSubmit(event)} >
                <label htmlFor="catPicker"><h6>Select a Topic</h6>
                    <select name="catPicker" ref={categoryRef}
                    >
                        {categories.map((item, index) => (
                            <option value={item} key={index} >{item}</option>
                        ))}
                    </select>
                </label>
                <label><h6>Difficulty</h6></label>
                <select name="difficulty" ref={diffRef}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <input type="checkbox" class="switch-input" />

                <div class="true-false-question" ref={questionTypeRef} value={"tf"}>
                    <label>Question
                        <input
                            placeholder="Romania is in the European Union"
                            type="text"
                            ref={questionRef}
                        />
                    </label>
                    <h3>True False</h3>
                    <label>Options: <span class="instructions">Please Select the correct answer</span></label>
                    <div class="tf-options">
                        <div class="tf-option">
                            <input type="radio" name="truefalse" ref={correctIndexRef}></input>
                            <label>True</label>
                        </div>
                        <div class="tf-option">
                            <input type="radio" name="truefalse" ref={correctIndexRef}></input>
                            <label>False</label>
                        </div>
                    </div>
                </div>

                <div class="multi-choice-question">
                    <h3 ref={questionTypeRef} value={"mc"}>Multiple Choice</h3>
                    <label>Question
                        <input
                            placeholder="Which president served the shortest time in office?"
                            type="text"
                            ref={questionRef}
                        />
                    </label>
                    <label>What is the correct answer
            <input placeholder="William Henry Harrison" type="text" ref={correctIndexRef} ref={answer4Ref} />
                    </label>
                    <label> Suggest some incorrect answers
            <input placeholder="William Howard Taft" type="text" ref={answer1Ref} />
                        <input placeholder="George Washington" type="text" ref={answer2Ref} />
                        <input placeholder="Barack Obama" type="text" ref={answer3Ref} />
                    </label>
                </div>
                <Button type="submit" text="SAVE QUESTION" onSubmit={(event) => handleSubmit(event)} />
            </form>
        </div>
    )

}

export default CreateAQuestion;