      // When the form is submitted, we validate there's an email and password entered
    function Login() {
      const [state, setState ] = React.useState({
        email: "",
        password: ""
      })

return (
<form>
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

    handleFormSubmit = event => {
      event.preventDefault();
  
      if (!userData.email || !userData.password) {
        return;
      }
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
      emailInput.val("");
      passwordInput.val("");
    };
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
      $.post("/api/login", {
        email,
        password
      })
        .then( () => {
          window.location.replace("/");
          // If there's an error, log the error
        })
        .catch(function (err) {
          console.log(err);
        });
    }