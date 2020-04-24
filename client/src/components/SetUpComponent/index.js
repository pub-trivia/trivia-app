import React, { useRef, useEffect, useState } from "react";
import API from "../../utils/API";
import { ADD_GAME } from "../../utils/actions";
import { useGameContext } from "../../utils/GlobalState";
import { useHistory } from '../../utils/GlobalState';
import Button from "../Button";
require('dotenv').config();
// const gameMaker = require('twilio')(cfg.accountSid, cfg.authToken);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const SetUpComponent = () => {
  const gameRef = useRef();
  const diffRef = useRef();
  const countRef = useRef(1);
  const categoryRef = useRef();
  const newNumberRef = useRef("");
  const [state, dispatch] = useGameContext();
  const [categories, setCategories] = useState([]);
  const [quizCode, setQuizCode] = useState('XXXX');
  // const [playerNumbers, setPlayerNumbers] = useState([]);

  // setPlayerNumbers(["+19196968557", "+17656445606"]);

  // To Do: how to get userid? 
  let userId = 2;

  const handleSubmit = event => {
    event.preventDefault();

    console.log("Category ref: ", categoryRef);

    // create the quiz record in the database 
    API.saveQuiz(userId,
      categoryRef.current.value,
      diffRef.current.value,
      countRef.current.value,
      quizCode)
      .then(result => console.log(result))
      .catch(err => console.log("Error: ", err));



    // set gameRef appropriately 
    dispatch({
      type: ADD_GAME,
      post: {
        game: quizCode
      }
    });
    // is this the right place to go next? 
    // history.pushState("/wait");
  };

  // const addNumber = () => {
  //   console.log("In addNumber: ", newNumberRef);
  //   console.log("playerNumbers: ", playerNumbers);
  //   // setPlayerNumbers(...playerNumbers, newNumberRef.current.value);
  // }

  useEffect(() => {
    API.getCategories()
      .then(results => setCategories(results.data));
    API.getQuizCode()
      .then(code => setQuizCode(code.data));
  }, []);


  return (
    <div>
      <h2>Set up your game!</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="catPicker"><h6>Select a Topic</h6>
          <select name="catPicker" ref={categoryRef}
          >
            {categories.map((item) => (
              <option value={item}>{item}</option>
            ))}
          </select>
        </label>
        <label><h6>Difficulty</h6></label>
        <select name="difficulty" ref={diffRef}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <label htmlFor="counter"><h6>Number of Questions</h6></label>
        <input name="counter" type="number" min="1" max="20" placeholder="Number of questions"
          ref={countRef} />
        <label htmlFor="gamecode"><h6>Game Code</h6></label>
        <input name="gamecode" value={quizCode} type="text" readOnly />
        {/* <label htmlFor="phoneNumbers"><h6>Text to Phone Numbers<br />Enter on separate lines</h6></label>
        <input className="phonenumber" type="textarea" width="40" ref={newNumberRef}
          onClick={addNumber()} /> */}
        {/* {playerNumbers.map((number, index) =>
          <input className="phonenumber" type="textarea" width="40" readOnly key={index} />
        )} */}
        <Button type="submit" text="Start Game" />
      </form>
    </div>
  );
};

export default SetUpComponent;
