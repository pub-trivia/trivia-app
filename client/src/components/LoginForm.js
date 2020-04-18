import React, { useRef, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import Button from '../components/Button';
import API from '../utils/API';
import { useHistory } from 'react-router-dom';
import { ADD_USER } from '../utils/actions';
import { useGameContext } from '../utils/GlobalState';
import setAuthToken from '../utils/setAuthToken';

// When the form is submitted, we validate there's an email and password entered
const LoginForm = () => {
  const emailRef = useRef();
  const pwRef = useRef();
  const [state, dispatch] = useGameContext();
  let history = useHistory();

  useEffect(() => {
    if(localStorage.jwtToken){
      processToken(localStorage.jwtToken);
   }
 }, []);

  const handleFormSubmit = event => {
    event.preventDefault();
  
    if (!emailRef.current.value || !pwRef.current.value) {
      return;
    }

    API.loginUser(emailRef.current.value, pwRef.current.value)
      .then((res) => {
        const { token } = res.data;
        processToken(token);
      })
  }

  const processToken = (token) => { 
    //set local token
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    
    const decoded = jwt_decode(token);
    //set global state
    if(decoded){
      dispatch({
        type: ADD_USER,
        post: {
            ...decoded,
            auth: true
        }
      })
      history.push('/profile');
    } 
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

export default LoginForm;