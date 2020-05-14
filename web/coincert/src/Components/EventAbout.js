import React from 'react';
import Form from 'react-bootstrap/Form'
import Web3 from 'web3'
import {EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS} from "../Middleware/SmartContractABI.js"

class EventAbout extends React.Component {

    constructor(props) {
      super(props);
      this.state = {account: null, web3: null, contract: null, eventTokenID: "", eventDetails: ""};

      this.handleTokenIDChange = this.handleTokenIDChange.bind(this);
      this.contractFindEvent = this.contractFindEvent.bind(this);

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

    handleTokenIDChange(event) {
      this.setState({eventTokenID: event.target.value});
    }

    contractFindEvent(event) {
      this.enableMetamask();
      try {
        this.state.contract.methods.tokenURI(this.state.eventTokenID).call({'from': this.state.account})
        .then(function(result){
            console.log(result);
            this.setState({eventDetails: result})
        }.bind(this))
        } catch (error) {
        console.log("Error" + error)
      }
      event.preventDefault();
    }

    enableMetamask = ()  => {
      window.ethereum.enable();
    }

  render() {
     return(
       <div>
       <Form onSubmit={this.contractFindEvent}>
        <Form.Label>
          Token ID
          <Form.Control type="text" value={this.state.event_name} onChange={this.handleTokenIDChange}/>
        </Form.Label>
        <Form.Control type="submit" value="Submit" />
      </Form>
      <h2>{this.state.eventDetails}</h2>
      </div>

  );
  }
}

export default EventAbout;
