import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import StatsComponent from "../components/StatsComponent";
import QuestionsSummary from "../components/QuestionsSummary";
import PlayerIcon from "../components/PlayerIcons";
import Button from '../components/Button';
import { useGameContext } from '../utils/GlobalState';
import API from "../utils/API";


function Profile() {

  const [state, dispatch] = useGameContext();
  const [email, setEmail] = useState('');
  const { name, icon, color, id } = state;


  useEffect(() => {
    API.getUser(id)
      .then(result => {
        setEmail(result.data.email);
      })
  }, []);



  return (
    <div className="userProfile">
      <div className="row">
        <div className="col user-info-col">
          <PlayerIcon icon={icon} color={color} />
          <h2 className="profile-name">{name}</h2>
          <div className="profile-email">{email}</div>
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