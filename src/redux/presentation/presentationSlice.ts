import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPresentationResponse, ISlideResponse } from '../../types/AixmusicApiTypes';
import { deleteSlideAudio, getPresentation, updateSlideAudio } from './presentationThunks';

interface PresentationState {
  presentation: IPresentationResponse,
  selectedSlideId: number,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PresentationState = {
  presentation: {} as IPresentationResponse,
  selectedSlideId: -1,
  status: 'idle'
};

const presentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {
    setSelectedSlideId: (state: PresentationState, action: PayloadAction<number>) => {
      state.selectedSlideId = action.payload;
    },
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
    builder.addCase(updateSlideAudio.fulfilled || deleteSlideAudio.fulfilled, (state, action) => {
      const { payload } = action;
      let slides: ISlideResponse[] = [] as ISlideResponse[];
      // @ts-ignore
      slides = state.presentation.slides?.map((slide) => payload.id !== slide.id ? slide : payload);
      state.presentation.slides = slides;
    });
  },
});

export const { setSelectedSlideId } = presentationSlice.actions;

export default presentationSlice.reducer;