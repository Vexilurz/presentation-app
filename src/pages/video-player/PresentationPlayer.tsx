import React, { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { Slideshow } from '../../types/CommonTypes';
import { PlayerToolbar } from './PlayerToolbar';
import { SlideImgContainer } from './SlideImgContainer';

interface Props {
  slideshow: Slideshow[];
  className: any;
}

export const PresentationPlayer = ({ className, slideshow }: Props) => {
  // Maybe join to one state obj?
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(
    slideshow[currentSlideIndex]
  );
  const [audioEl, setAudioEl] = useState(React.createRef<HTMLAudioElement>());

  useEffect(() => {
    setCurrentSlide(slideshow[currentSlideIndex]);
  }, [currentSlideIndex, slideshow]);

  useEffect(() => {}, [currentTime]);

  const totalTime = slideshow.reduce((acc, slide) => slide.endTime, 0);

  const handleCurrentTimeUpdate = (newTime: number) => {
    // TODO: HANDLE -1
    const newSlideIndex = slideshow.findIndex(
      (slide) => newTime < slide.endTime
    );
    console.log(newTime, newSlideIndex);
    setCurrentSlideIndex(newSlideIndex);
    setCurrentTime(newTime);

    if (audioEl?.current) {
      audioEl.current.currentTime =
        audioEl.current?.duration - (currentSlide.endTime - newTime);
      if (!playing) audioEl.current?.pause();
    }
  };

  return (
    <div className={className}>
      <SlideImgContainer src={currentSlide.img} />
      <ReactAudioPlayer
        id={'audio-' + currentSlideIndex}
        key={'audio-' + currentSlideIndex}
        src={currentSlide.audio}
        ref={(element) => {
          const ref = element?.audioEl as React.RefObject<HTMLAudioElement>;
          setAudioEl(ref);
        }}
        onEnded={() => {
          if (currentSlideIndex === slideshow.length - 1) {
            setCurrentSlideIndex(0);
            setCurrentTime(0);
            setPlaying(false);
          } else {
            setCurrentSlideIndex(currentSlideIndex + 1);
          }
        }}
        listenInterval={100}
        onListen={(time: number) => {
          setCurrentTime(currentTime + 0.1);
        }}
        controls
        autoPlay={playing}
      />
      <PlayerToolbar
        currentTime={currentTime}
        totalTime={totalTime}
        setCurrentTime={handleCurrentTimeUpdate}
        audioRef={audioEl}
        playing={playing}
        setPlaying={setPlaying}
      />
    </div>
  );
};
