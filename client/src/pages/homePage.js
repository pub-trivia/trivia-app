import React from 'react';
import PlayNowForm from "../components/PlayNowForm";
// import loginButton;
// import signupbutton;
// import joingquiz button:

const homePage = () => {
    return (
        <div>
          <LoginButton />
          <SignupButton />
          <h2>OR Play Now...</h2>
          <PlayNowForm />
          <JoinQuizButton />
        </div>
      );
}

export default homePage;