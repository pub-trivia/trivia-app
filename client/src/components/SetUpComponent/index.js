import React, { useRef, useEffect, useState } from "react";
import API from "../../utils/API";
import { ADD_GAME } from "../../utils/actions";
import { useGameContext } from "../../utils/GlobalState";
import { useHistory } from '../../utils/GlobalState';
import Button from "../Button";
import PhoneNumberList from "../PhoneNumberList";
require('dotenv').config();
const gameMaker = require('twilio')(accountSid, authToken);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFrom = process.env.TWILIO_FROM_NUM;


const SetUpComponent = () => {
  const gameRef = useRef();
  const diffRef = useRef();
  const countRef = useRef(1);
  const categoryRef = useRef();
  const newNumberRef = useRef("");
  const [state, dispatch] = useGameContext();
  const [categories, setCategories] = useState([]);
  const [quizCode, setQuizCode] = useState('XXXX');
  const [playerList, setPlayerList] = useState({
    phoneNums: [{ cellNum: "" }]
  });


  // To Do: how to get userid? 
  let userId = 2;

  const handleSubmit = event => {
    event.preventDefault();

    // create the quiz records in the database 
    API.saveQuiz(userId,
      categoryRef.current.value,
      diffRef.current.value,
      countRef.current.value,
      quizCode)
      .then(result => console.log(result))
      .catch(err => console.log("Error: ", err));

    // send Twilio messages 
    playerList.phoneNums.forEach(function (value) {
      console.log(value);

      gameMaker.messages.create({
        to: value.cellNum,
        from: twilioFrom,
        body: `The Quiz Maker has invited you to play Pub Trivia! <Click this link> Enter Code: R2D2`,
      }, function (err, message) {
        console.log(err);
      });
    });

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

  const handleAddNumber = () => {
    console.log("In addNumber: ", newNumberRef);
    console.log("playerList: ", playerList);
    setPlayerList({ phoneNums: playerList.phoneNums.concat([{ cellNum: newNumberRef.current.value }]) });
  };

  const handleChangeNumber = index => event => {
    const newPlayerList = playerList.phoneNums.map((player, sidx) => {
      if (index !== sidx) return player;
      return { cellNum: event.target.value };
    })
    setPlayerList({ phoneNums: newPlayerList })
  };

  const handleRemoveNumber = index => () => {
    setPlayerList({
      phoneNums: playerList.phoneNums.filter((n, sidx) =>
        index !== sidx)
    });
  };

  useEffect(() => {
    setPlayerList({
      phoneNums: [{ cellNum: "+19196968557" }]
    });
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
        <label htmlFor="counter"><h6>Number of Questions</h6></label>
        <input name="counter" type="number" min="1" max="20" placeholder="Number of questions"
          ref={countRef} />
        <label htmlFor="gamecode"><h6>Game Code</h6></label>
        <input name="gamecode" value={quizCode} type="text" readOnly />
        <PhoneNumberList
          handleAddNumber={handleAddNumber}
          handleChangeNumber={handleChangeNumber}
          handleRemoveNumber={handleRemoveNumber}
          phoneList={playerList.phoneNums}
        />
        <Button type="submit" text="Start Game" />
      </form>
    </div>
  );
};

export default SetUpComponent;
