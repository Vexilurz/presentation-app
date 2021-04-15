import { createSlice } from '@reduxjs/toolkit';
import { getAssetsUrl } from '../../lib/assests-helper';
import {
  IPresentationResponse,
  ISlideResponse,
} from '../../types/AixmusicApiTypes';
import { Slideshow } from '../../types/CommonTypes';
import { getPresentation } from '../presentation/presentationThunks';

interface PresentationState {
  presentation: IPresentationResponse;
  slideshow: Slideshow[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PresentationState = {
  presentation: {} as IPresentationResponse,
  slideshow: [] as Slideshow[],
  status: 'idle',
};

const extractSlideShow = (slides: ISlideResponse[]): Slideshow[] => {
  let durectionAcc = 0;
  const defaultSlideDuration = 5;
  return slides.map((slide) => {
    durectionAcc +=
      slide.audio.length > 0 ? slide.duration : defaultSlideDuration;
    return {
      img: getAssetsUrl(slide.image),
      endTime: durectionAcc,
      audio:
        slide.audio.length > 0
          ? getAssetsUrl(slide.audio) + `?key=${Math.floor(Math.random() * 100000)}`
          : '/mp3/blank.mp3',
    };
  });
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {},
  // Thunk reducers
  extraReducers: (builder) => {
    builder.addCase(getPresentation.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getPresentation.fulfilled, (state, action) => {
      // @ts-ignore
      state.presentation = action.payload;
      state.slideshow = extractSlideShow(state.presentation.slides);
      state.status = 'succeeded';
    });
    builder.addCase(getPresentation.rejected, (state, err) => {
      state.status = 'failed';
    });
  },
});

// export const {} = playerSlice.actions;

export default playerSlice.reducer;
