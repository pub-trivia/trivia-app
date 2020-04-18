import React, { createContext, useReducer, useContext } from "react";
import {
  SET_GAME,
  SET_NAME,
  SET_ICON,
  SET_COLOR,
  ADD_GAME,
  ADD_PLAYER,
} from "./actions";

const GameContext = createContext();
const { Provider } = GameContext;

const reducer = (state, action) => {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.post.name,
      };
    case SET_GAME:
      return {
        ...state,
        game: action.post.game,
      };
    case SET_ICON:
      return {
        ...state,
        icon: action.post.icon,
      };
    case SET_COLOR:
      return {
        ...state,
        color: action.post.color,
      };
    case ADD_GAME:
      return {
        ...state,
        game: action.post.game,
      };
    case ADD_PLAYER:
      return {
        ...state,
        game: action.post.game,
        name: action.post.name,
        icon: action.post.icon,
        color: action.post.color,
      };
    default:
      return state;
  }
};

const GameProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    game: "",
    name: "",
    icon: "",
    color: "",
  });
  console.log("==============state================");
  console.log(state);

  return <Provider value={[state, dispatch]} {...props} />;
};

const useGameContext = () => {
  return useContext(GameContext);
};

export { GameProvider, useGameContext };
