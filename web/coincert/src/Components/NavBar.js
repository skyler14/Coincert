import React from 'react';
import {Link} from 'react-router-dom'
import '../App.css';

class NavBar extends React.Component {

  render() {
     return(
       <header className="navbar">
      <Link className="textLink" to="/">
       <p className="headerText">CoinCert</p>
       </Link>
       </header>
  );
  }
}

export default NavBar;
