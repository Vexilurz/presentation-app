import { IPresentationResponse } from '../types/AixmusicApiTypes';
import { getAssetsUrl } from './assests-helper';

export const extractAudioUrls = (presentation: IPresentationResponse) => {
  const result: String[] = [];
  const defaultUrl = '/mp3/blank.mp3';

  presentation.slides.forEach((slide) => {
    slide.audio.length > 0 ? result.push(getAssetsUrl(slide.audio)) : result.push(defaultUrl);
  });

  return result;
};

export const concat = () => {};
