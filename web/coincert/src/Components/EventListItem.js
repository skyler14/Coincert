import React from 'react';
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import {
  Link,
} from "react-router-dom";

class EventListItem extends React.Component {

    constructor(props) {
      super(props);
      this.state = {eventDetails: props.eventDetails};
  }

  render() {
     return(<Container className="text-dark">
          <Row>
          <Link to={ {pathname:'/EventAbout', state: {eventTokenID: this.state.eventDetails.eventTokenID}, }}>
            <Col>{this.state.eventDetails.event_name}</Col>
            </Link>
            <Col>Ticket Price: {this.state.eventDetails.price}</Col>
          </Row>
          <Row>
            <Col>Date: {this.state.eventDetails.date}</Col>
            <Col>Start Time: {this.state.eventDetails.start_time}</Col>
            <Col>End Time: {this.state.eventDetails.end_time}</Col>
          </Row>
          </Container>

      );
    }
}

export default EventListItem;
