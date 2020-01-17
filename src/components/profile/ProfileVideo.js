import React from 'react';
import YouTube from 'react-youtube';
 
function ProfileVideo(props){
    const opts = {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 0
        }
      };

    return(
        <YouTube
        videoId={props.presentationVideo}
        opts={opts}

      />
    );
}

export default ProfileVideo;