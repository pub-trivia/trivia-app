import React from "react";

function PlayNowForm() {
    const [state, setState] = React.useState({
        displayName: "",
        avatar: "",
        avatarColor: "" 
    })

return (
    <form>
      <label>
        Display name
        <input
          type="text"
          name="displayName"
          value={state.displayName}
          onChange={handleChange}
        />
      </label>
      <h4>Select a profile icon and color:</h4>
      <label>
          Icon:
      <input
          type="radio"
          name="avatar"
          value={state.avatar}
          onChange={handleChange}
        />
        </label>
        <label>
            Color:
           <input
          type="radio"
          name="password"
          value={state.avatarColor}
          onChange={handleChange}
        /> 
        </label>
        
      {/* [#03E4AC, #04D5FB, #F7903E, #FFD72F, #9665D8, #F94141, #4481D8, #F96E99, #FFFFFF, #9FA1A0] */}

    </form>
);
}

export default PlayNowForm;