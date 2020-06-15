import React from "react";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { GameProvider } from './utils/GlobalState';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Game from './pages/Game';
import GameResults from './pages/GameResults';
import Wait from './pages/Wait';
import Profile from './pages/Profile';
import GameSetUp from './pages/GameSetUp';
import PrivateRoute from './components/PrivateRoute';
import Question from "./pages/Question";

const App = () => {

  return (
    <Router>
      <div>
        <GameProvider>
          <Navbar />
          <Route exact path="/" component={Home} />
          
          <Route exact path="/wait" component={Wait} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/results" component={GameResults} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          <Switch>
            <Route path="/join/:quizCode" component={Home} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/profile" component={Profile} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/new" component={GameSetUp} />
          </Switch>
          <Switch>
            <PrivateRoute exact path="/question" component={Question} />
          </Switch>
        </GameProvider>
      </div>
    </Router>
  )
}

export default App;
