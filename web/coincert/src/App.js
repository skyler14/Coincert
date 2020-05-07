import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import EventStreamerAttendee from './Components/EventStreamerAttendee'
import NavBar from './Components/NavBar'
import Landing from './Components/Landing'
import Web3 from 'web3'
import MetamaskNotEnabled from './Components/MetamaskNotEnabled'



class App extends Component {

  componentDidMount() {
    //this.loadBlockchainData()
    if (typeof window.ethereum !== 'undefined') { /* deal with it */
        this.setState({metamaskEnabled: false})
     }
     else {
       this.setState({metamaskEnabled: true})
     }
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
  }

  constructor(props){
    // Is there is an injected web3 instance?
    super(props)
    this.state = {metamaskEnabled: false}
  }


  render() {

    if (this.state.metamaskEnabled) {
      return (
            <MetamaskNotEnabled/>
      );
    }
    else {
        return (
    <div className="App">
      <header className="App-header">
        <Router>
        <NavBar/>
        <Switch>
          <Route path="/" exact component={Landing }/>
          <Route path="/EventStreamerAttendee" component={EventStreamerAttendee}/>
        </Switch>
        </Router>

      </header>
    </div>
  );}
 }
}

export default App;
