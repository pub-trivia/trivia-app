import React from "react";
import StatsComponent from "../components/StatsComponent";
import QuestionsSummary from "../components/QuestionsSummary";
import PlayerIcon from "../components/PlayerIcons";
import { useGameContext } from '../utils/GlobalState';
import { UPDATE_USER } from '../utils/actions';
// import "../style.css";



function Profile() {

  const [state, dispatch] = useGameContext();

  const { name, icon, color, email, password, users } = state;

  return (
    <div className="userProfile">
      <div className="row">
        <div className="col user-info-col">
          <PlayerIcon icon={icon} color={color} />
          <h1>{name}</h1>
          <input type="text" value={email} placeholder={email} />
          {/* <input type="password" value={password} placeholder={password} /> */}
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