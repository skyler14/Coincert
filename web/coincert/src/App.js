import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import EventStreamerAttendee from './components/EventStreamerAttendee'
import NavBar from './components/NavBar'
import LandingPage from './components/LandingPage'



class App extends Component {
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
        <NavBar/>
        <Switch>
          <Route path="/" exact component={LandingPage}/>
          <Route path="/EventStreamerAttendee" component={EventStreamerAttendee}/>
        </Switch>
        </Router>

      </header>
    </div>
  );
}
}

export default App;
