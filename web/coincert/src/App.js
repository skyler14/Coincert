import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import EventStreamerAttendee from './Components/EventStreamerAttendee'
import NavBar from './Components/NavBar'
import Landing from './Components/Landing'



class App extends Component {
  render() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
        <NavBar/>
        <Switch>
          <Route path="/" exact component={Landing}/>
          <Route path="/EventStreamerAttendee" component={EventStreamerAttendee}/>
        </Switch>
        </Router>

      </header>
    </div>
  );
}
}

export default App;
