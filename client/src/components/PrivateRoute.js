import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useGameContext } from '../utils/GlobalState';


const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    
    const [state, dispatch] = useGameContext();

    if(state.auth){
        return <Route {...rest} render={props => <Component {...props} />} />
    } else {
        return <Route {...rest} render={() => <Redirect to="/login" />} />
    }
};

export default PrivateRoute;