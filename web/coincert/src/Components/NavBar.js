import React from 'react';
import { Nav, Navbar } from "react-bootstrap";
import {
  Link,
} from "react-router-dom";
import Form from 'react-bootstrap/Form'


class NavBar extends React.Component {

    constructor(props) {
      super(props);
      this.state = {eventTokenID: ""}
      this.handleTokenIDChange = this.handleTokenIDChange.bind(this); }

    handleSubmit() {
      console.log("here");

  }

  handleTokenIDChange(event) {
      this.setState({eventTokenID: event.target.value});
    }

  render() {
     return(
       <Navbar bg="light" expand="lg">
        <Nav.Link href="/">CoinCert</Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">MyEvents</Nav.Link>
            <Nav.Link href="/EventCreate">Create Event</Nav.Link>
            <Nav.Link href="/CoincertAbout">About</Nav.Link>
          </Nav>
          <Form inline>
            <Form.Control type="text" placeholder="Search Event Token ID" className="mr-sm-2" onChange={this.handleTokenIDChange} />
            <Link to={ {pathname:'/EventAbout', state: { eventTokenID: this.state.eventTokenID}} } >Search</Link>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      );
    }
}

export default NavBar;
