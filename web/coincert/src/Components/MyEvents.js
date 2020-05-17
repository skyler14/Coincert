import React, {Component} from 'react';
import '../App.css';
import Web3 from 'web3'
import EventListItem from './EventListItem'
import ListGroup from 'react-bootstrap/ListGroup'
import {EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS} from "../Middleware/SmartContractABI.js"

// My event / All events w a prop?
class MyEvents extends Component {

  constructor(props) {
    super(props)
    this.addEventToList= this.addEventToList.bind(this)
    this.addEventToCreatedList= this.addEventToCreatedList.bind(this)
    this.state = {account: "", events: [], created_events: [], web3: null, contract: null}
  }

  componentDidMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0];
    const contract = await new web3.eth.Contract(EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS, {from: account, gas: 1500000, gasPrice: '20000000000'});
    try {
        var tokenIDs = [];
        await contract.methods.getOwnerTokens(account).call({'from': this.state.account}).then(function(result){
            console.log(result);
            tokenIDs = result;
        });
        console.log(tokenIDs)
        let events = [];
        for (let i = 0; i < tokenIDs.length; i++) {
            console.log(tokenIDs[i]);
            contract.methods.tokenURI(tokenIDs[i]).call({'from': this.state.account}).then(function(result){
                 result = JSON.parse(result);
                 console.log(result)
                 //maybe add a check for past events -> Or do something w this on the EventListItem component
                 result['eventTokenID'] = tokenIDs[i];
                 if (result.event_creator === account) {
                     result['isOwned'] = true;
                     this.addEventToCreatedList(result)
                 }
                 else {
                     result['isOwned'] = true;
                     this.addEventToList(result);
                 }
        }.bind(this));
        }
        this.setState({events: events});
    }
    catch(error) {
      console.log(error);
    }
    this.setState({ account: account , web3: web3, contract: contract});
  }

  addEventToList(result) {
    this.setState({events: this.state.events.concat(result)});
  }
  addEventToCreatedList(result) {
    this.setState({created_events: this.state.created_events.concat(result)});
  }


  render() {
      return (
        <div className="MyEvents">
          <h2>Account ID: {this.state.account} </h2>
          <h2> Purchased Events </h2>
          <ListGroup>
          {this.state.events.map((value, index) => {
              return <ListGroup.Item key={index}><EventListItem eventDetails={value}/></ListGroup.Item>
         })}
         </ListGroup>
         <h2> Created Events </h2>
         <ListGroup>
         {this.state.created_events.map((value, index) => {
             return <ListGroup.Item key={index}><EventListItem eventDetails={value}/></ListGroup.Item>
        })}
        </ListGroup>
        </div>
  );
}
}

export default MyEvents;
