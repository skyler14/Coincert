import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import EventStreamerAttendee from './Components/EventStreamerAttendee'
import EventStreamerHost from './Components/EventStreamerHost'
import NavBar from './Components/NavBar'
import Landing from './Components/Landing'
import EventCreate from './Components/EventCreate'
import MyEvents from './Components/MyEvents'
import CoincertAbout from './Components/CoincertAbout'
import Web3 from 'web3'
import MetamaskNotEnabled from './Components/MetamaskNotEnabled'
import EventAbout from './Components/EventAbout'
import 'bootstrap/dist/css/bootstrap.min.css';


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
    this.setState({ account: accounts[0], web3: web3 })
  }

  constructor(props){
    // Is there is an injected web3 instance?
    super(props)
    this.state = {metamaskEnabled: false, web3: null}
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
          <Route path="/" exact component={Landing}/>
          <Route path="/MyEvents" component={MyEvents}/>
          <Route path="/EventStreamerAttendee" component={EventStreamerAttendee}/>
          <Route path="/EventStreamerHost" component={EventStreamerHost}/>
          <Route path="/EventCreate" component={EventCreate}/>
          <Route path="/EventAbout" component={EventAbout}/>
          <Route path="/CoincertAbout" component={CoincertAbout}/>
        </Switch>
        </Router>

      </header>
    </div>
  );}
 }
}

export default App;
