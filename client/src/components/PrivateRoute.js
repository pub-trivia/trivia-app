import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/Login';
import { useGameContext } from '../utils/GlobalState';


const PrivateRoute = ({ component, ...rest }) => {
    const [state, dispatch] = useGameContext();

    if (state.auth) {
        return <Route {...rest} component={component} />
    } else {
        return <Route {...rest} component={Login} />
    }
    
};

export default PrivateRoute;