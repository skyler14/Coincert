import React, {Component} from 'react';
import '../App.css';
import Web3 from 'web3'
import EventListItem from './EventListItem'
import ListGroup from 'react-bootstrap/ListGroup'
import {EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS} from "../Middleware/SmartContractABI.js"

// My event / All events w a prop?
class LandingPage extends Component {

  constructor(props) {
    super(props)
    this.addEventToList= this.addEventToList.bind(this)
    this.state = {account: "", events: [], web3: null, contract: null}
  }

  componentDidMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0];
    const contract = await new web3.eth.Contract(EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS, {from: account, gas: 1500000, gasPrice: '20000000000'});
    let tokenIDs = ['0xf51255ebcf71bd3688f3ea82d1edd8f2119abcd48bae94e4c0f019364ce91c15', '0xf51255ebcf71bd3688f3ea82d1edd8f2119abcd48bae94e4c0f019364ce91c15'];
    try {
        //this.state.contract.methods.?.call({'from': this.state.account}).then(function(result){
        //      console.log(result);
        /// Need to add chaincode call that grabs all events
        let events = [];
        for (let i = 0; i < tokenIDs.length; i++) {
            contract.methods.tokenURI(tokenIDs[i]).call({'from': this.state.account}).then(function(result){
                 result = JSON.parse(result);
                 //maybe add a check for past events -> Or do something w this on the EventListItem component
                 result['tokenID'] = tokenIDs[i];
                 this.addEventToList(result);
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


  render() {
  return (
    <div className="LandingPage">
      <h2> Welcome Account ID: {this.state.account} </h2>
      <ListGroup>
      {this.state.events.map((value, index) => {
          return <ListGroup.Item key={index}><EventListItem eventDetails={value}/></ListGroup.Item>
     })}
     </ListGroup>

    </div>
  );
}
}

export default LandingPage;
