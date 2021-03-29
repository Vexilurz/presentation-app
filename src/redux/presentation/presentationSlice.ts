import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPresentationResponse, ISlideResponse } from '../../types/AixmusicApiTypes';
import { getPresentation } from './presentationThunks';

interface PresentationState {
  presentation: IPresentationResponse,
  selectedSlide: ISlideResponse,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PresentationState = {
  presentation: {} as IPresentationResponse,
  selectedSlide: {} as ISlideResponse,
  status: 'idle'
};

const presentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {
    setSelectedSlide: (state: PresentationState, action: PayloadAction<ISlideResponse>) => {
      state.selectedSlide = action.payload;
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
  },
});

export const { setSelectedSlide } = presentationSlice.actions;

export default presentationSlice.reducer;