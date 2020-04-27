import React, {Component} from 'react';
import videojs from "video.js/dist/video.js";
import '../App.css'
import "video.js/dist/video-js.css"

class EventStreamerAttendee extends Component {
  constructor(props) {
      super(props);

      this.state = {
          stream: true,
          videoJsOptions: null,
          player: null,
          //nodeVideo: 'video_id'
      }
  }
  componentDidMount() {
      this.setState({
          stream: true,
          videoJsOptions: {
              autoplay: true,
              controls: true,
              sources: [{
                  src: "../zoom_.mp4",//'rtmp://35.202.191.227/live&test', 
                  type:'video/mp4' //rtmp/flv?
              }],
              fluid: true,
          }
      });

      this.setState({
        player: videojs(this.videoNode, this.state.videoJsOptions, function onPlayerReady() {
            console.log('onPlayerReady', this)
          }),
          });
  }

  componentWillUnmount() {
      if (this.state.player) {
          this.state.player.dispose()
      }
  }

  render() {
      return (
          <div className="videoPlayer">
              <div data-vjs-player>
                  <video ref={ node => this.videoNode = node } className="video-js vjs-big-play-centered"/>
              </div>
          </div>
      )
  }
}
export default EventStreamerAttendee;
