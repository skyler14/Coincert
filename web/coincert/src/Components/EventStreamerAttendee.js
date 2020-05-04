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
              <ReactPlayer url={"http://qthttp.apple.com.edgesuite.net/1010qwoeiuryfg/sl.m3u8"} playing={true} controls={true}/>
          </div>
      )
  }
}
export default EventStreamerAttendee;
