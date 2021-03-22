import { createAsyncThunk } from '@reduxjs/toolkit';
import { AixmusicApi } from '../../lib/aixmusic-api/AixmusicApi';

const api = AixmusicApi.getInstance();

export const getPresentation = createAsyncThunk('presentation/get', async ( url: string, { dispatch }) => {
  try {
    const data = await api.getPresentation(url);
    return data;
  } catch (err) {
    // Here we can check errors and dispatch some actions if is needed
    throw err;
  }
});