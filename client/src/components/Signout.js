import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ADD_USER, SET_USERS, SET_SCORES } from '../utils/actions';
import { useGameContext } from '../utils/GlobalState';

// When the logout button is clicked, we clear localstorage
// and we clear GlobalState
const Signout = () => {
    const [state, dispatch] = useGameContext();
    let history = useHistory();

    useEffect(() => {
        if (localStorage.jwtToken) {
            localStorage.removeItem('jwtToken');
        }
        if (localStorage.currentGame) {
            localStorage.removeItem('currentGame');
        }
        clearState();
    }, []);

    const clearState = () => {
        dispatch({
            type: ADD_USER,
            post: {
                id: '',
                name: '',
                icon: '',
                color: '',
                auth: false
            }
        })
        dispatch({
            type: SET_USERS,
            post: {
                users: []
            }
        })
        dispatch({
            type: SET_SCORES,
            post: {
                scores: []
            }
        })
        history.push('/');
    }

    return (
        <h2>Signing you out!</h2>
    );
}

export default Signout;