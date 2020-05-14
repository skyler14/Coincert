import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css';
import Web3 from 'web3'
import {EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS} from "../Middleware/SmartContractABI.js"

class EventCreate extends React.Component {

    constructor(props) {
      super(props);
      this.state = {event_name: '', event_capacity: 0, event_price: 0, account: null, web3: null, contract: null};

      this.handleNameChange = this.handleNameChange.bind(this);
      this.handlePriceChange = this.handlePriceChange.bind(this);
      this.contractCreateEvent = this.contractCreateEvent.bind(this);
      this.handleCapacityChange = this.handleCapacityChange.bind(this);

    }

    async loadBlockchainData() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0];
      const contract = await new web3.eth.Contract(EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS, {from: account, gas: 1500000, gasPrice: '20000000000'})
      //const events = await web3.eth.get
      this.setState({ account: account , web3: web3, contract: contract})
    }

    componentDidMount() {
      this.loadBlockchainData()
    }

    getTokenID(token_uri) {
        return this.state.web3.utils.soliditySha3(token_uri)
        //return int.from_bytes(sha3.keccak_256(token_uri.encode('utf-8')).digest(), byteorder="big", signed=False)
      }

    handleNameChange(event) {
      this.setState({event_name: event.target.value});
    }
    handleCapacityChange(event) {
      this.setState({event_capacity: event.target.value});
    }
    handlePriceChange(event) {
      this.setState({event_price: event.target.value});
    }

    contractCreateEvent(event) {
      this.enableMetamask();
      let token_uri =  {
        "event_name": this.state.event_name,
        "price": this.state.event_price,
        "version": 1
      };
      let capacity = this.state.event_capacity;
      token_uri["event_creator"] = this.state.account;
      console.log("createEvent")
      try {
        this.state.contract.methods.mintWithTokenURI(capacity, this.getTokenID(token_uri), JSON.stringify(token_uri)).send(this.state.account)
        .on('transactionHash', function(hash){
          console.log(hash);
        })
          .on('receipt', function(receipt){
            console.log(receipt);

          })
          .on('confirmation', function(confirmationNumber, receipt){
            console.log(confirmationNumber);

          })
          .on('error', console.error);
        } catch (error) {
        console.log(error)
      }
      event.preventDefault();
    }

    enableMetamask = ()  => {
      window.ethereum.enable();
    }

  render() {
     return(
       <div>
       <form onSubmit={this.contractCreateEvent}>
        <label>
          Event Name:
          <input type="text" value={this.state.event_name} onChange={this.handleNameChange}/>
        </label>
        <label>
          Capacity:
          <input type="text" value={this.state.event_capacity} onChange={this.handleCapacityChange}/>
        </label>
        <label>
          Price (in ETH):
          <input type="text" value={this.state.event_price} onChange={this.handlePriceChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>

  );
  }
}

export default EventCreate;
