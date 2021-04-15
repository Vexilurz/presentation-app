import React, { useEffect, useState } from 'react';
import ReactAudioPlayer from 'react-audio-player';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { Slideshow } from '../../types/CommonTypes';
import { PlayerOverlay } from './PlayerOverlay';
import { PlayerToolbar } from './PlayerToolbar';
import { SlideImgContainer } from './SlideImgContainer';

interface Props {
  slideshow: Slideshow[];
  presentationTitle: string;
  className: any;
  whileLabel?: WhiteLabel
}

export interface WhiteLabel {
  src: string;
  href: string;
}

export const PresentationPlayer = ({
  className,
  slideshow,
  presentationTitle,
  whileLabel
}: Props) => {
  // Maybe join to one state obj?
  const [playing, setPlaying] = useState(false);
  const [volumeValue, setVolumeValue] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(
    slideshow[currentSlideIndex]
  );
  const [isOverlayShowed, setOverlayShowed] = useState(true);

  const [audioEl, setAudioEl] = useState(React.createRef<HTMLAudioElement>());
  const [fullScreen, setFullScreen] = useState(false);
  const handle = useFullScreenHandle();

  useEffect(() => {
    setCurrentSlide(slideshow[currentSlideIndex]);
  }, [currentSlideIndex, slideshow]);

  useEffect(() => {
    if (isOverlayShowed === false) setPlaying(true);
  }, [isOverlayShowed]);

  useEffect(() => {
    if (playing) audioEl.current?.play();
    else audioEl.current?.pause();
  }, [playing, audioEl]);

  useEffect(() => {
    if (fullScreen) handle.enter();
    else if (handle.active) handle.exit();
  }, [fullScreen]);

  const totalTime = slideshow.reduce((acc, slide) => slide.endTime, 0);

  const handleCurrentTimeUpdate = (newTime: number) => {
    const newSlideIndex = slideshow.findIndex(
      (slide) => newTime < slide.endTime
    );
    setCurrentSlideIndex(newSlideIndex);
    setCurrentTime(newTime);

    if (audioEl && audioEl.current) {
      audioEl.current.currentTime =
        audioEl.current.duration - (currentSlide.endTime - newTime);
      if (!playing) audioEl.current.pause();
    }
  };

  return (
    <FullScreen handle={handle} className={className}>
      <PlayerOverlay
        presentationTitle={presentationTitle}
        isShowed={isOverlayShowed}
        setIsShowed={setOverlayShowed}
      />
      <SlideImgContainer
        src={currentSlide.img}
        isOverlayShowed={isOverlayShowed}
      />
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
        preload="auto"
        volume={volumeValue / 100}
        style={{ display: 'none' }}
      />
      {!isOverlayShowed ? (
        <PlayerToolbar
          whileLabel={whileLabel}
          volumeValue={volumeValue}
          setVolumeValue={setVolumeValue}
          currentTime={currentTime}
          totalTime={totalTime}
          setCurrentTime={handleCurrentTimeUpdate}
          playing={playing}
          setPlaying={setPlaying}
          fullScreen={fullScreen}
          setFullScreen={setFullScreen}
        />
      ) : null}
    </FullScreen>
  );
};
