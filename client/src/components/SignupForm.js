import React, { useRef } from "react";
import Button from '../components/Button';
import API from '../utils/API';

import ColorPicker from './ColorPicker';
import IconPicker from './IconPicker';

const SignupForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();
  const avatarRef = useRef();
  const colorRef = useRef();

 const handleChange = event => {
    console.log(event);
  }
  // When the signup button is clicked, we validate the displayname, email and password are not blank
  const handleFormSubmit = event => {
    event.preventDefault();

    if (!emailRef.current.value || !pwRef.current.value || !nameRef.current.value) {
      alert("Please enter a display name, email and password. Then select an avatar and color!")
      return;
    }
    // If we have an email and password, run the signUpUser function
    API.signUpUser(nameRef.current.value, emailRef.current.value, pwRef.current.value, avatarRef.current.value, colorRef.current.value);
  };

  return (
    <form onSubmit={(event) => handleFormSubmit(event)}>
      <label>
        Name
        <input
          placeholder="Display Name"
          type="text"
          ref={nameRef}
        />
      </label>
      <label>
        Email
        <input
          type="text"
          placeholder="email.address@gmail.com"
          ref={emailRef}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          placeholder="**************"
          ref={pwRef}
        />
      </label>
      <IconPicker ref={iconRef}/>
      <ColorPicker ref={colorRef}/>
      <Button type="submit" text="SIGN UP" />
    </form>
  );
}



// Does a post to the signup route. If successful, we are redirected to their user page?
// Otherwise we log any errors
// function signUpUser(displayName, email, password, avatar, avatarColor) {
//   $.post("/api/signup", {
//     displayName,
//     email,
//     password,
//     avatar,
//     avatarColor
//   })
//     .then(data => {
//       window.location.replace("/");
//       // If there's an error, handle it by throwing up an alert
//     })
//     .catch(handleLoginErr);
// }

// function handleLoginErr(err) {
//   $("#alert .msg").text(err.responseJSON);
//   $("#alert").fadeIn(500);
// }

export default SignupForm; 