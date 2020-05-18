import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Web3 from 'web3'


import {EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS} from "../Middleware/SmartContractABI.js"


//Dont start until URL is valid?

class EventStreamerAttendee extends Component {
  constructor(props) {
      super(props);
      console.log(props);
      this.state = {event_url: ""}
    }

    componentDidMount() {
        this.contractGetURL();
    }

    async contractGetURL() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const contract = await new web3.eth.Contract(EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS, {from: account, gas: 1500000, gasPrice: '20000000000'});
          //const events = await web3.eth.get
      console.log(this.props.location.state.eventTokenID);
      await contract.methods.getURL(this.props.location.state.eventTokenID).call({'from': this.state.account}, function(error, result){
            console.log("GETURL: " + result);
            this.setState({ event_url: result});
       }.bind(this));
        }



  render() {
      return (
          <Container className="text-dark" fluid>
            <Row><Col>Welcome to {this.props.location.state.eventDetails.event_name}</Col></Row>
            <Row className="justify-content-md-center">
                <Col>
                <ReactPlayer url={this.state.event_url} playing={true} controls={true}/>
                </Col>
            </Row>
        </Container>
      )
  }
}
export default EventStreamerAttendee;
