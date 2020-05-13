import React from 'react';
import { Nav, Navbar } from "react-bootstrap";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from  'react-bootstrap/FormControl'


class NavBar extends React.Component {

    handleSubmit() {
      console.log("here");

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
          <Form inline onSubmit={this.handleSubmit}>
            <FormControl type="text" placeholder="Search Event Token ID" className="mr-sm-2" />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      );
    }
}

export default NavBar;
