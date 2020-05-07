import React, {Component} from 'react';
import '../App.css'

// TODO: Create Page to direct to when Metamask is not enabled https://github.com/ConsenSys/react-metamask

class MetamaskNotEnabled extends Component {
  constructor(props) {
      super(props);
  }

  onEnableMetamaskClick() {
    try {
      window.ethereum.enable();
    }
    catch {
      window.location.href=window.location
    }
      window.location.href=window.location

  }


  render() {
      return (
          <div className="App">
              <h2>1. Use Chrome or FireFox</h2>
              <h2>2. Download <a href="https://metamask.io/download.html"> Metamask </a></h2>
              <h2>3. Enable Metamask</h2>
              <button className="enableMetamaskButton" onClick={this.onEnableMetamaskClick}>Enable Metamask</button>
          </div>
      )
  }
}
export default MetamaskNotEnabled;
