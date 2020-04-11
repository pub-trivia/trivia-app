import React from "react";

// componentDidMount() {

function signupForm() {
    const [state, setState] = React.useState({
        displayName: "",
        email: "",
        password: "",
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
      <label>
        Email
        <input
          type="text"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
        />
      </label>
      <input
          type="radio"
          name="avatar"
          value={state.avatar}
          onChange={handleChange}
        />
        <input
          type="radio"
          name="password"
          value={state.avatarColor}
          onChange={handleChange}
        />
      {/* [#03E4AC, #04D5FB, #F7903E, #FFD72F, #9665D8, #F94141, #4481D8, #F96E99, #FFFFFF, #9FA1A0] */}

    </form>
);
}
    handleInputChange = event => {
        const userData = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
}

    // When the signup button is clicked, we validate the displayname, email and password are not blank
    handleFormSubmit = event => {
      event.preventDefault();
  
      if (!userData.email || !userData.password || !userData.displayName) {
          alert("please enter a display name, email and password. Then select an avatar and color!")
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.displayName, userData.email, userData.password, userData.avatar, userData.avatarColor);
    };
  
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
        .then( data => {
          window.location.replace("/");
          // If there's an error, handle it by throwing up an alert
        })
        .catch(handleLoginErr);
    }
  
    function handleLoginErr(err) {
      $("#alert .msg").text(err.responseJSON);
      $("#alert").fadeIn(500);
    }

export default signupForm; 