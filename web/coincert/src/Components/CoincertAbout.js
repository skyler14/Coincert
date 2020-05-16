import React, {Component} from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


class CoincertAbout extends Component {
  render() {
      return(
          <Container className="text-dark">
            <Row>
            <Col>Welcome to CoinCert</Col>
            </Row>
            <Row>
            <Col>This is created as a Proof of Concept for an Ethereum dAPP that enables virtual concerts</Col>
            </Row>
            <Row>
            <Col><a href="https://github.com/skyler14/Coincert">source code</a></Col>
            </Row>

         </Container>
      )
  }
}
export default CoincertAbout;
