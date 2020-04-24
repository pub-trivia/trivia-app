import React, { useEffect } from 'react';
import PlayerIcon from '../PlayerIcons';
import { useGameContext } from '../../utils/GlobalState';
import './navbar.css';





const Navbar = () => {

    const [state, dispatch] = useGameContext();

    const { icon, color } = state;

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src="./assets/PubTriviaLogo.png" />
            </div>
            <div className="main-menu">
                <div className="topnav" id="myTopnav">
                    <a href="/">Home</a>
                    <a href="/GameSetUp">Create a Game</a>
                    <a href="/CreateQuestion">Create a Question</a>
                    {/* <a href="javascript:void(0);" style="font-size:15px;" className="icon" onclick="myFunction()">&#9776;</a> */}
                </div>
                <div classNae="profile-icon"><a href="/profile"><PlayerIcon icon={icon} color={color} /></a></div>
            </div>

        </div>
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