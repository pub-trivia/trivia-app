import React, { useRef, useEffect } from "react";
import API from "../../utils/API";
import { ADD_GAME } from "../../utils/actions";

import Button from "../Button";

const SetUpComponent = () => {
  const gameRef = useRef();

  let categories = API.getCategories();
  let gameRef = API.getQuizCode();
  console.log("Make a quiz: ", categories, gameRef);

  const handleSubmit = (event) => {
    dispatchEvent({
      type: ADD_GAME,
      post: {
        game: gameRef.current.value,
        difficulty: difficulty.value,
      },
    });
    // TODO go to join screen
  };

  return (
    <div>
      <h2>Set up your game!</h2>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label>Select a Topic</label>Select a Topic:
        <div class="dropdown-content" id="pickCategory">
          <select name="categories">
            {categories.map((item) => (
              <option value="{item}">${item}</option>
            ))}
          </select>
        </div>
        <label>Difficulty</label>
        <select name="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <label>Number of Questions</label>
        <span> Need spinner here </span>
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
