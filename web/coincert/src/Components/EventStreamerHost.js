import React, {Component} from 'react';
import Form from 'react-bootstrap/Form'
import Web3 from 'web3'
import {EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS} from "../Middleware/SmartContractABI.js"



class EventStreamerHost extends Component {

  constructor(props) {
      super(props);
      console.log(props);
      this.state = {event_url: '', account: "", web3: null, contract: null}
      this.handleURLChange = this.handleURLChange.bind(this);
      this.contractSetURL = this.contractSetURL.bind(this);

  }

  componentDidMount() {
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0];
      const contract = await new web3.eth.Contract(EVENT_CONTRACT_ABI, EVENT_CONTRACT_ADDRESS, {from: account, gas: 1500000, gasPrice: '20000000000'})
      this.setState({ account: account , web3: web3, contract: contract})
}

   contractSetURL(event) {

    if (this.state.event_url === "") {
        let urls = ['http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8', 'http://devimages.apple.com/iphone/samples/bipbop/gear1/prog_index.m3u8', 'http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8']
        let chosen = urls[Math.floor(Math.random() * urls.length)];
        this.setState({event_url: chosen})
    }

    try {
         this.state.contract.methods.setURL(this.props.location.state.eventTokenID, this.state.event_url).send({'from': this.state.account})
          .on('transactionHash', function(hash){
            console.log("TransactionHash " + hash);
        })
            .on('receipt', function(receipt){
              console.log("Receipt " + JSON.stringify(receipt));
            })
            .on('confirmation', function(confirmationNumber, receipt){
              console.log("Confirmation Number " + confirmationNumber);
            })
            .on('error', console.error);
          } catch (error) {
          console.log("Error" + error)
        }
        event.preventDefault()
      }

  handleURLChange(event) {
    this.setState({event_url: event.target.value});
  }


  render() {
    return (
        <Form onSubmit={this.contractSetURL}>
        <Form.Group controlId="setURL.url">
         <Form.Label>
           Set Event URL:
           <Form.Control type="text" value={this.state.event_url} onChange={this.handleURLChange}/>
          </Form.Label>
         </Form.Group>
         <Form.Control type="submit" value="Submit" />
         <Form.Control type="submit" value="Use Default URL" />
       </Form>
    )
  }
}
export default EventStreamerHost;
