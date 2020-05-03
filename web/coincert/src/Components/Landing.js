import React, {Component} from 'react';
import '../App.css';
import {
  Link,
} from "react-router-dom";


class LandingPage extends Component {



  render() {
  return (
    <div className="LandingPage">
      <h1> Welcome </h1>
      <Link to="/EventStreamerAttendee">
      <button>  Event Streamer Attendee Test</button>
      </Link>
      <Link to="/EventStreamerHost">
      <button>  Event Streamer Host Test</button>
      </Link>
    </div>
  );
}
}

export default LandingPage;
