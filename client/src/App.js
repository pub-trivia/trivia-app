import React from "react";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import { GameProvider } from "./utils/GlobalState";
import Home from './pages/Home';
import Game from './pages/Game';

const App = () => {
  return (
    <Router>
      <div>
        <GameProvider>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/game">
              <Game />
            </Route>
          </Switch>
        </GameProvider>
      </div>
    </Router>
  )
}

export default App;
