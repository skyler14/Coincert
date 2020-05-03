import React, {Component} from 'react';
import '../App.css'
import ReactPlayer from 'react-player'
//import myVideo from '../test_video.mp4'


class EventStreamerAttendee extends Component {
  constructor(props) {
      super(props);
  }
  //componentDidMount() {

  //}
  render() {
      return (
          <div className="videoPlayer">
              <ReactPlayer url={"rtmp://35.202.191.227/live/test"} playing={true} controls={true}/>
          </div>
      )
  }
}
export default EventStreamerAttendee;
