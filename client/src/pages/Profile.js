import React, { useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { ADD_USER } from '../utils/actions';
import jwt_decode from 'jwt-decode';
import StatsComponent from "../components/StatsComponent";
import QuestionsSummary from "../components/QuestionsSummary";
import PlayerIcon from "../components/PlayerIcons";
import Button from '../components/Button';
import { useGameContext } from '../utils/GlobalState';
import API from "../utils/API";
import setAuthToken from '../utils/setAuthToken';


function Profile() {

  const [state, dispatch] = useGameContext();
  const nameRef = useRef();
  const emailRef = useRef();
  const oldpwRef = useRef();
  const newpwRef = useRef();
  const { name, icon, color, id } = state;


  useEffect(() => {
    API.getUser(id)
      .then(result => {
        nameRef.current.value = result.data.displayName;
        emailRef.current.value = result.data.email;
      })
  }, []);

  const handleFormSubmit = event => {
      event.preventDefault();

      if (!emailRef.current.value) {
          return;
      }

      API.updateUser(id, nameRef.current.value, emailRef.current.value, oldpwRef.current.value, newpwRef.current.value)
          .then((res) => {
              console.log("==> updateUser returned");
              console.log(res);
              const { token } = res.data;
              processToken(token);
          })
          .catch(err => {
              console.log(err);
              alert("The old password you entered is incorrect. Please try again.");
          });
  }

  const processToken = (token) => {
      //set local token
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);

      const decoded = jwt_decode(token);
      //set global state
      if (decoded) {
          dispatch({
              type: ADD_USER,
              post: {
                  ...decoded,
                  auth: true
              }
          })
      }
  }

  return (
    <div className="userProfile">
      <div className="row">
        <div className="col user-info-col">
          <PlayerIcon icon={icon} color={color} />
          <form onSubmit={(event) => handleFormSubmit(event)}>
            <label>
                Name
              <input
                  type="text"
                  ref={nameRef}
              />
            </label>
            <label>
                Email
              <input
                  type="text"
                  ref={emailRef}
              />
            </label>
            <label>
                Old Password
              <input
                    type="password"
                    placeholder="**************"
                    ref={oldpwRef}
              />
            </label>
            <label>
                New Password
              <input
                    type="password"
                    placeholder="**************"
                    ref={newpwRef}
              />
            </label>
                  <Button type="submit" text="UPDATE PROFILE" />
              </form>
          <Link to='/new'>
            <Button text="CREATE NEW GAME" />
          </Link>
          <Link to='/question'>
            <Button text="CREATE NEW QUESTION" />
          </Link>
        </div>
        <div className="col user-stats-col">
          <StatsComponent />
          <QuestionsSummary />
        </div>
      </div>
    </div>
  );
}

export default Profile;