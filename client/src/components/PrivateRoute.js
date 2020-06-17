import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import { ADD_USER } from '../utils/actions';
import { useGameContext } from '../utils/GlobalState';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


const PrivateRoute = ({ component, ...rest }) => {
    const [state, dispatch] = useGameContext();

    const processToken = (token) => {
        //set local token
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);

        const decoded = jwt_decode(token);
        //set global state
        if (decoded) {
            dispatch({
                type: ADD_USER,
                post: {
                    ...decoded,
                    auth: true
                }
            })
        }
    }

    if (state.auth) {
        return <Route {...rest} component={component} />
    } else if (localStorage.jwtToken) {
        processToken(localStorage.jwtToken)
        return <Route {...rest} component={component} />
    } else {
        return <Route {...rest} component={Login} />
    }
    
};

export default PrivateRoute;