import React from "react";
import Navbar from '../components/Navbar';

// import icon component
// import stats component
// import yourquestionscomponent
// import "../style.css";

function ProfilePage() {
    return (
        <div>
          <Navbar />
          <IconComponent />
          <StatsComponent />
          <YourQuestionsComponent />
        </div>
      );
}

export default ProfilePage;