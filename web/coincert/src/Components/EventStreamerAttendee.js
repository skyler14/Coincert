import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
//import myVideo from '../test_video.mp4'


class EventStreamerAttendee extends Component {
  constructor(props) {
      super(props);
      console.log(props);  }

  render() {
      return (
          <Container className="text-dark" fluid>
            <Row><Col>Welcome to {this.props.location.state.eventDetails.event_name}</Col></Row>
            <Row>
                <Col>
                <ReactPlayer url={"http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8"} playing={true} controls={true}/>
                </Col>
            </Row>
        </Container>
      )
  }
}
export default EventStreamerAttendee;
