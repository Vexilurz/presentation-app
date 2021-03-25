import { createSlice } from '@reduxjs/toolkit';
import { IApiPresentation } from '../../types/AixmusicApiTypes';
import { getPresentation } from './presentationThunks';

interface PresentationState {
  // TODO: Add types
  presentation: IApiPresentation,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: PresentationState = {
  presentation: {} as IApiPresentation,
  status: 'idle'
};

const presentationSlice = createSlice({
  name: 'presentation',
  initialState,
  reducers: {
    // Add ordinary reducers here
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

export const {  } = presentationSlice.actions;

export default presentationSlice.reducer;