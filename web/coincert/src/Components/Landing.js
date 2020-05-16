import React, {Component} from 'react';
import '../App.css';
import Web3 from 'web3'
import EventListItem from './EventListItem'
import ListGroup from 'react-bootstrap/ListGroup'
import {EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS} from "../Middleware/SmartContractABI.js"


class LandingPage extends Component {

  constructor(props) {
    super(props)
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
        let events = [];
        for (let i = 0; i < tokenIDs.length; i++) {
            contract.methods.tokenURI(tokenIDs[i]).call({'from': this.state.account}).then(function(result){
                  events.push(JSON.parse(result));
                  this.setState({eventDetails: result});
        });
        console.log(events);
        }
        this.setState({events: events})
    }
    catch(error) {
      console.log(error);
    }
    this.setState({ account: account , web3: web3, contract: contract});
  }


  render() {
  return (
    <div className="LandingPage">
      <h4> Welcome Account ID: {this.state.account} </h4>
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
