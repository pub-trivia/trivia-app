import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { Link } from 'react-router-dom';

import PlayerIcon from '../PlayerIcons';
import { useGameContext } from '../../utils/GlobalState';
import { ADD_USER } from '../../utils/actions';
import setAuthToken from '../../utils/setAuthToken';
import './navbar.css';

const Navbar = () => {

    const [state, dispatch] = useGameContext();

    const { icon, color, auth } = state;

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
            <>
            {auth ? 
                <div className="navbar">
                    <div className="nav-logo">
                        <img src="../../assets/PubTriviaLogo.png" alt="Pub Trivia Logo"/>
                    </div>
                    <div className="main-menu">
                        <div className="topnav" id="myTopnav">
                            <Link to="/">Home</Link>
                            <Link to="/new">Create a Game</Link>
                            <Link to="/question">Create a Question</Link>
                            {/* <a href="javascript:void(0);" style="font-size:15px;" className="icon" onclick="myFunction()">&#9776;</a> */}
                        </div>
                        <div className="profile-icon"><a href="/profile"><PlayerIcon icon={icon} color={color} /></a></div>
                    </div>
                </div>
            : null}
            </>
    )

    function myFunction() {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }
}

export default Navbar;
