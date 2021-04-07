import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IPresentationResponse,
  ISlideResponse,
} from '../../types/AixmusicApiTypes';
import { BoolValue } from '../../types/CommonTypes';
import {
  createSlide,
  createSlideImageOnly,
  deleteSlide,
  deleteSlideAudio,
  getPresentation,
  updateSlideAudio,
  uploadPresentation,
} from './presentationThunks';

interface PresentationState {
  presentation: IPresentationResponse;
  selectedSlideId: number;
  selectedSlide?: ISlideResponse;
  isBusy: BoolValue;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  uploadStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PresentationState = {
  presentation: {} as IPresentationResponse,
  selectedSlideId: -1,
  selectedSlide: {} as ISlideResponse,
  isBusy: {value: false},
  status: 'idle',
  uploadStatus: 'idle',
};

const presentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {
    setSelectedSlideId: (
      state: PresentationState,
      action: PayloadAction<number>
    ) => {
      state.selectedSlideId = action.payload;
      state.selectedSlide = state.presentation.slides.find(
        (slide) => slide.id === state.selectedSlideId
      );
    },
    setIsBusy: (
      state: PresentationState,
      action: PayloadAction<boolean>
    ) => {
      state.isBusy = {value: action.payload};
    }
  },
  // Thunk reducers
  extraReducers: (builder) => {
    builder.addCase(getPresentation.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getPresentation.fulfilled, (state, action) => {
      state.presentation = action.payload;
      state.status = 'succeeded';
    });
    builder.addCase(getPresentation.rejected, (state, err) => {
      state.status = 'failed';
    });
    builder.addCase(uploadPresentation.pending, (state) => {
      state.uploadStatus = 'loading';
    });
    builder.addCase(uploadPresentation.fulfilled, (state, action) => {
      // TODO: redirect to player?
      state.uploadStatus = 'succeeded';
    });
    builder.addCase(uploadPresentation.rejected, (state, err) => {
      state.uploadStatus = 'failed';
    });
    builder.addCase(deleteSlide.fulfilled, (state, action) => {
      const deletedSlideId = action.payload;
      state.presentation.slides = state.presentation.slides.filter(
        (slide) => slide.id !== deletedSlideId
      );
      state.selectedSlide = {} as ISlideResponse;
    });
    builder.addCase(
      updateSlideAudio.fulfilled,
      (state, action) => {
        const { payload } = action;
        let slides: ISlideResponse[] = [] as ISlideResponse[];
        slides = state.presentation.slides?.map((slide) =>
          payload.id !== slide.id ? slide : payload
        );
        state.presentation.slides = slides;
        console.log('updated')
      }
    );
    builder.addCase(
      deleteSlideAudio.fulfilled,
      (state, action) => {
        const { payload } = action;
        let slides: ISlideResponse[] = [] as ISlideResponse[];
        slides = state.presentation.slides?.map((slide) =>
          payload.id !== slide.id ? slide : payload
        );
        state.presentation.slides = slides;
        console.log('deleted')
      }
    );
    builder.addCase(
      createSlide.fulfilled,
      (state, action) => {
        const { payload } = action;
        let slides: ISlideResponse[] = state.presentation.slides ? state.presentation.slides : [] as ISlideResponse[];
        slides.push(payload);
        state.presentation.slides = slides;
      }
    );
  },
});

export const { setSelectedSlideId, setIsBusy } = presentationSlice.actions;

export default presentationSlice.reducer;
