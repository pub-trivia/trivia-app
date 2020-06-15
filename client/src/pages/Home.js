import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';

import JoinForm from "../components/JoinForm";
import Header from "../components/Header";
import Button from '../components/Button';
import { Link } from "react-router-dom";
import { ADD_USER, ADD_GAME } from '../utils/actions';
import { useGameContext } from '../utils/GlobalState';
import setAuthToken from '../utils/setAuthToken';


const Home = () => {
  const [state, dispatch] = useGameContext();

  useEffect(() => {
    if (localStorage.jwtToken) {
        processToken(localStorage.jwtToken);
    }

  }, []);

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

  return (
    <div id="home">
      <div className="row">
        <div className="col header">
          <Header />
        </div>
        <div className="col">
          {!state.auth ?
            <>
              <Link to="/login">
                <Button type="button" text="LOG IN" />
              </Link>
              <Link to="/signup">
                <Button type="button" text="SIGN UP" />
              </Link>
            </>
          : null}
          <h2>{!state.auth ? "OR" : null} Play Now...</h2> 
          <JoinForm />
        </div>
      </div>
    </div>
  );
}

export default Home;
