import React, { createRef, useRef } from "react";
import Button from '../components/Button';
import API from '../utils/API';
import { useGameContext } from '../utils/GlobalState';
import ColorPicker from './ColorPicker';
import IconPicker from './IconPicker';
import { useHistory } from 'react-router-dom';
import { ADD_USER } from '../utils/actions';

const SignupForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();
  const iconRef = createRef();
  const colorRef = createRef();
  const [state, dispatch] = useGameContext();
  let history = useHistory();

  // When the signup button is clicked, we validate the displayname, email and password are not blank
  const handleFormSubmit = event => {
    event.preventDefault();

    if (!emailRef.current.value || !pwRef.current.value || !nameRef.current.value) {
      alert("Please enter a display name, email and password. Then select an avatar icon and color!")
      return;
    }
    // If we have an email and password, run the signUpUser function
    API.signUpUser(nameRef.current.value, emailRef.current.value, pwRef.current.value, iconRef.current.value, colorRef.current.value)
    .then(
    dispatch({
      type: ADD_USER,
      post: {
          name: nameRef.current.value,
          icon: iconRef.current.value,
          color: colorRef.current.value
      }
  }))
  history.push('/profile');
}

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