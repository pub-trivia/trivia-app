import React, { useRef, useEffect, useState } from "react";
import API from "../../utils/API";
import { ADD_GAME } from "../../utils/actions";
import { useGameContext } from "../../utils/GlobalState";
import { useHistory } from 'react-router-dom';
import Button from "../Button";
import PhoneNumberList from "../PhoneNumberList";
import './setup.css';

const SetUpComponent = () => {

  const diffRef = useRef();
  const countRef = useRef(1);
  const categoryRef = useRef();
  const newNumberRef = useRef("");
  const [state, dispatch] = useGameContext();
  const [categories, setCategories] = useState([]);
  const [quizCode, setQuizCode] = useState('XXXX');
  const [playerList, setPlayerList] = useState({
    phoneNums: []
  });

  console.log("At initialization:", playerList.phoneNums.length, playerList.phoneNums);

  let userId = state.id;
  let history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();

    if (!countRef.current.value > 0 || !categoryRef.current.value || !diffRef.current.value) {
      alert("Please select a category, difficulty level, and number of questions!")
      return;
    }

    // create the quiz records in the database 
    API.saveQuiz(userId,
      categoryRef.current.value,
      diffRef.current.value,
      countRef.current.value,
      quizCode)
      .then(result => console.log(result))
      .catch(err => console.log("Error: ", err));
    if (playerList.phoneNums.length > 0) {
      console.log("TWILIO: ", playerList.phoneNums.length, playerList.phoneNums);
      const phoneNums = playerList.phoneNums.map(player => player.cellNum);
      console.log("TWILIO: phone numbers length: ", phoneNums.length, phoneNums);
      API.message(quizCode, phoneNums)
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }

    // set game in 
    dispatch({
      type: ADD_GAME,
      post: {
        game: quizCode
      }
    });

    history.push("/");
  };

  const handleAddNumber = () => {
    console.log("In addNumber: ", newNumberRef);
    if (playerList.phoneNums.length === 0) {
      setPlayerList({ phoneNums: [{ cellNum: newNumberRef.current.value }] });
    }
    else {
      setPlayerList({ phoneNums: playerList.phoneNums.concat([{ cellNum: newNumberRef.current.value }]) });
    }
    console.log("playerList: ", playerList);
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
      phoneNums: [{}]
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
        <input type="number" min="5" max="20" default="5" ref={countRef} />
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
