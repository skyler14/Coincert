import React, {Component} from 'react';
import '../App.css';
import {
  Link,
} from "react-router-dom";
import Web3 from 'web3'

class LandingPage extends Component {

  constructor(props) {
    super(props)
    this.state = {account: "", events: []}
  }

  componentDidMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    //const events = await web3.eth.get

    this.setState({ account: accounts[0] })

  }


  render() {
  return (
    <div className="LandingPage">
      <h3> Welcome Account ID: {this.state.account} </h3>



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
