import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IPresentationResponse,
  ISlideResponse,
} from '../../types/AixmusicApiTypes';
import { BoolValue, ThunkStatus } from '../../types/CommonTypes';
import {
  createSlide,
  deleteSlide,
  deleteSlideAudio,
  getPresentation,
  updateSlideAudio,
  uploadPresentation,
} from './presentationThunks';

interface PresentationState {
  presentation: IPresentationResponse;
  selectedSlideId: number;
  isBusy: BoolValue;
  status: ThunkStatus;
  uploadStatus: ThunkStatus;
  slideAudioProcessing: ThunkStatus;
  isRecording: Boolean;
}

const initialState: PresentationState = {
  presentation: {} as IPresentationResponse,
  selectedSlideId: -1,
  isBusy: { value: false },
  status: 'idle',
  uploadStatus: 'idle',
  slideAudioProcessing: 'idle',
  isRecording: false,
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
    },
    setIsBusy: (state: PresentationState, action: PayloadAction<boolean>) => {
      if (!state.selectedSlideId) {
        state.selectedSlideId = state.presentation.slides[0]?.id;
      }
      state.isBusy = { value: action.payload };
    },
    setIsRecording: (state: PresentationState, action: PayloadAction<boolean>) => {
      state.isRecording = action.payload;
    },
    setPresentationSlides: (
      state: PresentationState,
      action: PayloadAction<ISlideResponse[]>
    ) => {
      const { payload } = action;
      state.presentation.slides = payload;
    },
    startSlideAudioProcessing: (
      state: PresentationState,
    ) => {
      state.slideAudioProcessing = 'loading';
    },
  },
  // Thunk reducers
  extraReducers: (builder) => {
    builder.addCase(getPresentation.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(getPresentation.fulfilled, (state, action) => {
      let tmp: IPresentationResponse = action.payload as IPresentationResponse;
      tmp.slides?.sort((a, b) =>
        a.order > b.order ? 1 : a.order < b.order ? -1 : 0
      );
      state.presentation = tmp;
      state.selectedSlideId = state.presentation.slides[0]?.id;
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
      state.selectedSlideId = state.presentation.slides[0]?.id;
    });

    builder.addCase(updateSlideAudio.fulfilled, (state, action) => {
      const { payload } = action;
      let slides = [] as ISlideResponse[];
      slides = state.presentation.slides.map((slide) =>
        payload.id !== slide.id ? slide : payload
      );
      state.presentation.slides = slides;
      state.slideAudioProcessing = "idle";
    });

    builder.addCase(deleteSlideAudio.fulfilled, (state, action) => {
      const { payload } = action;
      let slides: (ISlideResponse | undefined)[] = [] as ISlideResponse[];
      slides = state.presentation.slides?.map((slide) =>
        payload?.id !== slide.id ? slide : payload
      );
      // @ts-ignore
      state.presentation.slides = slides;
    });
    builder.addCase(createSlide.fulfilled, (state, action) => {
      const { payload } = action;
      let slides: ISlideResponse[] = state.presentation.slides
        ? state.presentation.slides
        : ([] as ISlideResponse[]);
      if (payload) slides.push(payload);
      state.presentation.slides = slides;
    });
  },
});

export const {
  setSelectedSlideId,
  setIsBusy,
  setPresentationSlides,
  startSlideAudioProcessing,
  setIsRecording,
} = presentationSlice.actions;

export default presentationSlice.reducer;
