import React from 'react';

const Header = () => {
    return (

        <div className="logo">
            <svg className="desktop" width="2160px" height="2160px">
                <polygon points="2160,0 0,2160 2160,2160" fill="white" />
            </svg>
            <svg className="mobile" width="1000px" height="300px">
                <polygon points="0,300 1000,0 1000,300" fill="white" />
            </svg>
            <img className="logo-background" src="../../assets/logo-background.png" alt="logo background"/>
            <img className="logo-image" src="../../assets/PubTriviaLogo.png" alt="pub trivia logo"/>
        </div>
    );
}

export default Header;