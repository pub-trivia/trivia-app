import React from "react";
// import icon component
import StatsComponent from "../components/StatsComponent";
// import yourquestionscomponent
// import "../style.css";



function Profile() {

  let userId = 2;

  return (
    <div>
      <h1>Profile Page!</h1>
      {/* <IconComponent /> */}
      <StatsComponent userId={userId} />
      {/*<YourQuestionsComponent /> */}
    </div>
  );
}

export default Profile;