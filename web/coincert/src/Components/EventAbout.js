import React from 'react';
import Web3 from 'web3'
import {EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS} from "../Middleware/SmartContractABI.js"
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

// Check user wallet to see if event ticket has been purhchaseds
// If have ticket & event time < 30 minutes away, then show link to event stream viewing.
//

class EventAbout extends React.Component {

    constructor(props) {
      super(props);
      console.log(props)
      this.state = {account: null, web3: null, contract: null, eventTokenID: props.location.state.eventTokenID, eventDetails: "", idIsValid: true};
      console.log(this.state);
      this.contractFindEvent = this.contractFindEvent.bind(this);

    }

    async loadBlockchainData() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      const contract = await new web3.eth.Contract(EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS, {from: account, gas: 1500000, gasPrice: '20000000000'});
      //const events = await web3.eth.get
      this.setState({ account: account , web3: web3, contract: contract});

      this.contractFindEvent()
    }

    componentDidMount() {
      this.loadBlockchainData();
    }

    contractFindEvent() {
      this.enableMetamask();
      try {

      this.state.contract.methods.tokenURI(this.state.eventTokenID).call({'from': this.state.account}).then(function(result){
            console.log(result);
            this.setState({eventDetails: JSON.parse(result)});
        }.bind(this));
    }
    catch(error) {
        console.log(error);
        this.setState({idIsValid: false})
    }
    }
    // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"

    enableMetamask = ()  => {
      window.ethereum.enable();
    }

    // "event_name": this.state.event_name,
    // "price": this.state.event_price,
    // "date": this.state.date,
    // "start_time": this.state.start_time,
    // "end_time": this.state.end_time,

  render() {
      if (!this.state.idIsValid) {
          return (
              <div><h1>Invalid Token ID, return to the home page!</h1></div>
          );
      }
      else{
         return(
             <Container className="text-dark " fluid>
                 <Row>
                   <Col>{this.state.eventDetails.event_name}</Col>
                   <Col>Ticket Price: {this.state.eventDetails.price}</Col>
                 </Row>
                 <Row>
                   <Col>Date: {this.state.eventDetails.date}</Col>
                   <Col>Start Time: {this.state.eventDetails.start_time}</Col>
                   <Col>End Time: {this.state.eventDetails.end_time}</Col>
                 </Row>
            </Container>
        );
    }
  }
}

export default EventAbout;
