import React from 'react';
import PlayerIcon from '../PlayerIcons';

const Navbar = () => {
    return (
        //show the nav bar!
        <div className="navbar">
            <div class="main-menu">
                <ul>
                    <li>Home</li>
                    <li>Create a Game</li>
                    <li>Create a Question</li>
                    <li className="Icons"><PlayerIcon /></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;