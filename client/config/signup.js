import React from "react";

// componentDidMount() {

function Form() {
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
 