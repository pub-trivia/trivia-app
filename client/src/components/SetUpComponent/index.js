import React, { useRef } from "react";
import API from "../../utils/API";
import { ADD_GAME } from "../../utils/actions";
import { useGameContext } from "../../utils/GlobalState";


import Button from "../Button";

const SetUpComponent = () => {
  const gameRef = useRef();

  let categories = API.getCategories();
  let gameCode = API.getQuizCode();
  // have to get userId into userId variable, selected category into category
  // use 2  and "General" for testing   
  var userId = 2;
  var category = "General";

  console.log("Make a quiz: ", categories, userId, gameRef);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatchEvent({
      type: ADD_GAME,
      post: {
        game: gameRef.current.value
      }
    });
    //history.push('/');
  };

  return (
    <div>
      <h2>Set up your game!</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label>Select a Topic:</label>
        <div class="dropdown-content" id="pickCategory">
          <select name="categories">
            {categories.map((item) => (
              <option value="{item}">${item}</option>
            ))}
          </select>
        </div>
        <label>Difficulty:</label>
        <select name="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <label>Number of Questions</label>
        <span> Need spinner here - get into questionCount variable </span>
        <label>Game Code</label>
        <input value="{gameCode}" type="text" ref={gameRef}>
          {gameRef}
        </input>
        <Button type="submit" text="Start Game" />
      </form>
    </div>
  );
};

export default SetUpComponent;
