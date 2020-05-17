import React from 'react';
import Web3 from 'web3'
import {EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS} from "../Middleware/SmartContractABI.js"
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import {
  Link,
} from "react-router-dom";

class EventAbout extends React.Component {

    constructor(props) {
      super(props);
      console.log(props)
      this.state = {account: null, web3: null, contract: null, eventTokenID: props.location.state.eventTokenID, eventDetails: "", idIsValid: true, eventIsPurchased: false, isOwner: false};
      this.contractFindEvent = this.contractFindEvent.bind(this);
      this.purchaseEventToken = this.purchaseEventToken.bind(this);


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

    async contractFindEvent() {
      this.enableMetamask();
      try {

      await this.state.contract.methods.tokenURI(this.state.eventTokenID).call({'from': this.state.account}).then(function(result){
            console.log(result);
            this.setState({eventDetails: JSON.parse(result)});
        }.bind(this));

        await this.state.contract.methods.isAccountTokenOwner(this.state.eventTokenID).call({'from': this.state.account}).then(function(result){
              console.log(result);
              this.setState({eventIsPurchased: result});
          }.bind(this));

          await this.state.contract.methods.ownerOf(this.state.eventTokenID).call({'from': this.state.account}).then(function(result){
                console.log("Owner " + result);
                if (this.state.account === result) {
                    this.setState({isOwner: true});
                }
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


    async purchaseEventToken() {
        try {
            await this.state.contract.methods.purchaseToken(this.state.eventTokenID, 1).send({'from': this.state.account}).then(function(result){
                console.log(result);
                this.setState({eventIsPurchased: true});
            })
        }
        catch(error) {
            console.log(error);
        }
        //refresh component here
    }

    renderDynamicEvent() {

        if (this.state.isOwner) {
            return (
                <Link to={ {pathname:'/EventStreamerHost', state: { eventTokenID: this.state.eventTokenID, eventDetails: this.state.eventDetails}} } >Start Event Stream</Link>
            )
        }
        else if (this.state.eventIsPurchased) {
            return (
                <Link to={ {pathname:'/EventStreamerAttendee', state: { eventTokenID: this.state.eventTokenID, eventDetails: this.state.eventDetails}} }>Join Event Stream</Link>
            )
        }
        else {
            return (
                <Button variant="success" onClick={this.purchaseEventToken}>Purchase Event Token</Button>
            )
    }
    }

  render() {
      if (!this.state.idIsValid) {
          return (
              <div><h1>Invalid Token ID, return to the home page!</h1></div>
          );
      }
      else{
         return(
             <Container className="text-dark" fluid>
                 <Row>
                   <Col>{this.state.eventDetails.event_name}</Col>
                   <Col>Ticket Price: {this.state.eventDetails.price}</Col>
                 </Row>
                 <Row>
                   <Col>Date: {this.state.eventDetails.date}</Col>
                   <Col>Start Time: {this.state.eventDetails.start_time}</Col>
                   <Col>End Time: {this.state.eventDetails.end_time}</Col>
                 </Row>
                 <Row>
                   <Col>Token ID: {this.state.eventTokenID}</Col>
                 </Row>
                 <Row><Col>{this.renderDynamicEvent()}</Col></Row>
            </Container>
        );
    }
  }
}

export default EventAbout;
