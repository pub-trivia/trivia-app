import React, { useRef } from "react";
import Button from '../components/Button';

const SignupForm = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const pwRef = useRef();
  const avatarRef = useRef();
  const colorRef = useRef();

  handeChange = event => {
    console.log(event);
  }
  // When the signup button is clicked, we validate the displayname, email and password are not blank
  handleFormSubmit = event => {
    event.preventDefault();

    if (!emailRef.current.value || !pwRef.current.value || !nameRef.current.value) {
      alert("Please enter a display name, email and password. Then select an avatar and color!")
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(nameRef.current.value, emailRef.current.value, pwRef.current.value, avatarRef.current.value, colorRef.current.value);
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
      <input
        type="radio"
        ref={avatarRef}
        onChange={handleChange}
      />
      <input
        type="radio"
        ref={colorRef}
        onChange={handleChange}
      />
      {/* [#03E4AC, #04D5FB, #F7903E, #FFD72F, #9665D8, #F94141, #4481D8, #F96E99, #FFFFFF, #9FA1A0] */}
      <Button type="submit" text="SIGN UP" />
    </form>
  );
}



// Does a post to the signup route. If successful, we are redirected to their user page?
// Otherwise we log any errors
function signUpUser(displayName, email, password, avatar, avatarColor) {
  $.post("/api/signup", {
    displayName,
    email,
    password,
    avatar,
    avatarColor
  })
    .then(data => {
      window.location.replace("/");
      // If there's an error, handle it by throwing up an alert
    })
    .catch(handleLoginErr);
}

function handleLoginErr(err) {
  $("#alert .msg").text(err.responseJSON);
  $("#alert").fadeIn(500);
}

export default SignupForm; 