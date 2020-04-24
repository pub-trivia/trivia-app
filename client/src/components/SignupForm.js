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
    API.signUpUser(nameRef.current.value, emailRef.current.value, pwRef.current.value, state.icon, state.color)
      .then(result => {
        dispatch({
          type: ADD_USER,
          post: {
            id: result.data.userId,
            name: result.data.displayName,
            icon: result.data.icon,
            color: result.data.color,
            auth: true
          }
        });
        history.push('/login');
      })
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
      <IconPicker />
      <ColorPicker />
      <Button type="submit" text="SIGN UP" />
    </form>
  );
}

export default SignupForm; 