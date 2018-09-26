import React, { Component } from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube';

// https://youtu.be/kkB_Vuq8EBM
// https://www.youtube.com/watch?v=`;
class ReactYouTube extends Component {
  static propTypes = {
    videoId: PropTypes.string,
  };

  static defaultProps = {
    videoId: '',
  };

  videoOnReady = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
    console.log(event.target);
  };

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };

    const { videoId } = this.props;

    return (
      <YouTube videoId={videoId} opts={opts} onReady={this.videoOnReady} />
    );
  }
}

export default ReactYouTube;
