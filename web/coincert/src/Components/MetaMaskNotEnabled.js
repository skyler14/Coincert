import React, {Component} from 'react';
import '../App.css'

// TODO: Create Page to direct to when Metamask is not enabled https://github.com/ConsenSys/react-metamask

class MetaMaskNotEnabled extends Component {
  constructor(props) {
      super(props);
  }
  render() {
      return (
          <div>
              <p>Enable Metamask<p>
          </div>
      )
  }
}
export default MetaMaskNotEnabled;
