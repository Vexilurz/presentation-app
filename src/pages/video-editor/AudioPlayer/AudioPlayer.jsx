
// FROM: https://codesandbox.io/s/5wwj02qy7k?file=/src/Audio.js
import './styles.scss';
import React from "react";

// import Song from "./Song";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";

import useAudioPlayer from './useAudioPlayer';

function AudioPlayer(props) {
  const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer();

  return (
    <div className="player">
      <audio id="audio" src={props.audioUrl}>
        {/* <source src={props.audioUrl} /> */}
        Your browser does not support the <code>audio</code> element.
      </audio>
      {/* <Song songName="Instant Crush" songArtist="Daft Punk ft. Julian Casablancas" /> */}
      <div className="controls">
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
        {/* {playing ? 
          <Pause handleClick={() => setPlaying(false)} /> :
          <Play handleClick={() => setPlaying(true)} />
        } */}
      </div>
    </div>
  );
}

export default AudioPlayer;