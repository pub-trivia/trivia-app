import React, { useEffect } from "react";
import axios from "axios";
import API from "";

const SetUpComponent = () => {
  let categories = API.getCategories();
  let gameCode = API.getQuizCode();
  console.log("Make a quiz: ", categories, gameCode);

  return (
    <div>
      <h2>Set up your game!</h2>
      <form>
        Select a Topic:
        <div class="dropdown-content" id="pickCategory">
          <select name="categories">
            {categories.map((item) => (
              <option value="{item}">${item}</option>
            ))}
          </select>
        </div>
        Difficulty:
        <select name="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        Number of Questions:
        <span> Need spinner here </span>
        Game Code:
        <input value="{gameCode}">{gameCode}</input>
        <button>Join</button>
      </form>
    </div>
  );
};

export default SetUpComponent;
