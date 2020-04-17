import React, { createContext, useReducer, useContext } from 'react';
import { SET_AUTH, ADD_PLAYER, ADD_USER } from './actions';

const GameContext = createContext();
const { Provider } = GameContext;

const reducer = (state, action) => {
    switch(action.type) {
        case SET_AUTH:
            return {
                ...state,
                auth: action.post.auth
            };
        case ADD_PLAYER:
            return {
                ...state,
                game: action.post.game,
                name: action.post.name,
                icon: action.post.icon,
                color: action.post.color
            };
        case ADD_USER:
            return {
                ...state,
                id: action.post.id,
                name: action.post.name,
                icon: action.post.icon,
                color: action.post.color, 
                auth: action.post.auth
            };
        default:
            return state;
    }

    
};

const GameProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        id: '',
        game: '',
        name: '',
        icon: '',
        color: '', 
        auth: false
    });
    console.log("==============state================");
    console.log(state);

    return <Provider value={[state, dispatch]} {...props} />;
};

const useGameContext = () => {
    return useContext(GameContext);
}

export { GameProvider, useGameContext };