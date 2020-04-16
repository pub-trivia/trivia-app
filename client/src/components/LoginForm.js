import React, { useRef } from 'react';
import Button from '../components/Button';
import API from '../utils/API';
import { useHistory } from 'react-router-dom';
import { ADD_USER } from '../utils/actions';
import { useGameContext } from '../utils/GlobalState';

// When the form is submitted, we validate there's an email and password entered
const LoginForm = () => {
  const emailRef = useRef();
  const pwRef = useRef();
  const [state, dispatch] = useGameContext();
  let history = useHistory();

  const handleFormSubmit = event => {
    event.preventDefault();
  
    if (!emailRef.current.value || !pwRef.current.value) {
      return;
    }
    // If we have an email and password we run the loginUser function and clear the form
    API.loginUser(emailRef.current.value, pwRef.current.value)
    .then((res) => {
        if(!res.message){
          dispatch({
            type: ADD_USER,
            post: {
                name: res.displayName,
                icon: res.avatar,
                color: res.avatarColor
            }
          })
          history.push('/profile');
        } else {
        console.log(res.message);
        }
    }
    );
  }

  return (
    <form onSubmit={(event) => handleFormSubmit(event)}>
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
      <Button type="submit" text="LOG IN" />
    </form>
  );
}




// // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
// function loginUser(email, password) {
//   $.post("/api/login", {
//     email,
//     password
//   })
//     .then(() => {
//       window.location.replace("/");
//       // If there's an error, log the error
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// }

export default LoginForm;