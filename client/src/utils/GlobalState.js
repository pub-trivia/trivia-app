import React, { createContext, useReducer, useContext } from 'react';
import { SET_AUTH, SET_COLOR, SET_ICON, SET_USERS, ADD_PLAYER, ADD_USER, ADD_GAME, UPDATE_USER } from './actions';

const GameContext = createContext();
const { Provider } = GameContext;

const reducer = (state, action) => {
    switch (action.type) {
        case SET_ICON:
            return {
                ...state,
                icon: action.post.icon
            };
        case SET_COLOR:
            return {
                ...state,
                color: action.post.color
            };
        case SET_AUTH:
            return {
                ...state,
                auth: action.post.auth
            };
        case SET_USERS:
            return {
                ...state,
                users: action.post.users
            };
        case ADD_PLAYER:
            return {
                ...state,
                game: action.post.game,
                name: action.post.name
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
        case ADD_GAME:
            return {
                ...state,
                game: action.post.game
            };
        case UPDATE_USER:
            return {
                ...state,
                id: action.post.id,
                name: action.post.name,
                email: action.post.email,
            };
        default:
            return state;
    }
};

const GameProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useReducer(reducer, {
        id: '',
        game: '',
        gameid: '',
        name: '',
        email: '',
        icon: '',
        color: '',
        auth: false,
        users: []
    });
    console.log("==============state================");
    console.log(state);

    return <Provider value={[state, dispatch]} {...props} />;
};

const useGameContext = () => {
    return useContext(GameContext);
};

export { GameProvider, useGameContext };
