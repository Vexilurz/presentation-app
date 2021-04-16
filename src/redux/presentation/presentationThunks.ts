import { createAsyncThunk } from '@reduxjs/toolkit';
import { AixmusicApi } from '../../lib/aixmusic-api/AixmusicApi';
import {
  ICreatePresentationDTO,
  ICreateSlideDTO,
  IUpdatePresentationDTO,
  IUpdateSlideAudioDTO,
  IUpdateSlideDTO,
} from '../../types/AixmusicDTOTypes';
import { extractAudioUrls } from '../../lib/audio-concat';
import {
  IPresentationResponse,
  ISlideResponse,
} from '../../types/AixmusicApiTypes';
import { notify } from '../notification/notificationSlice';
import { ThunkApi } from '../store';
import { setIsRecording } from './presentationSlice';

const api = AixmusicApi.getInstance();

export const getPresentation = createAsyncThunk(
  'presentation/get',
  async (url: string, { dispatch }) => {
    try {
      const data = await api.getPresentation(url);
      return data;
    } catch (err) {
      dispatch(notify({ text: 'Get presentation failed.', severity: 'error' }));
      console.log(err);
    }
  }
);

export const createPresentation = createAsyncThunk(
  'presentation/create',
  async (dto: ICreatePresentationDTO, { dispatch }) => {
    try {
      const data = await api.createPresentation(dto);
      return data;
    } catch (err) {
      dispatch(
        notify({ text: 'Create presentation failed.', severity: 'error' })
      );
      console.log(err);
    }
  }
);

export const updatePresentation = createAsyncThunk(
  'presentation/update',
  async (
    { url, dto }: { url: string; dto: IUpdatePresentationDTO },
    { dispatch }
  ) => {
    try {
      const data = await api.updatePresentation(url, dto);
      return data;
    } catch (err) {
      dispatch(
        notify({ text: 'Update presentation failed.', severity: 'error' })
      );
      console.log(err);
    }
  }
);

export const deletePresentation = createAsyncThunk(
  'presentation/delete',
  async (url: string, { dispatch }) => {
    try {
      const data = await api.deletePresentation(url);
      return data;
    } catch (err) {
      dispatch(
        notify({ text: 'Delete presentation failed.', severity: 'error' })
      );
      console.log(err);
    }
  }
);

export const createSlide = createAsyncThunk(
  'slide/create',
  async ({ url, dto }: { url: string; dto: ICreateSlideDTO }, { dispatch }) => {
    try {
      const data = await api.createSlide(url, dto);
      return data;
    } catch (err) {
      dispatch(notify({ text: 'Create slide failed.', severity: 'error' }));
      console.log(err);
    }
  }
);

export const createSlideImageOnly = createAsyncThunk(
  'slide/create/image',
  async ({ url, image }: { url: string; image: Blob }, { dispatch }) => {
    try {
      const data = await api.createSlideImageOnly(url, image);
      return data;
    } catch (err) {
      dispatch(
        notify({
          text: 'Create slide with image only failed.',
          severity: 'error',
        })
      );
      console.log(err);
    }
  }
);

export const updateSlide = createAsyncThunk(
  'slide/update',
  async (
    { slideID, dto }: { slideID: number; dto: IUpdateSlideDTO },
    { dispatch }
  ) => {
    try {
      const data = await api.updateSlide(slideID, dto);
      return data;
    } catch (err) {
      dispatch(notify({ text: 'Update slide failed.', severity: 'error' }));
      console.log(err);
    }
  }
);

export const updateSlideAudio = createAsyncThunk<
  ISlideResponse,
  IUpdateSlideAudioDTO,
  ThunkApi
>('slide/update/audio', async (dto, { dispatch, extra }) => {
  const { api } = extra;
  try {
    const data = await api.updateSlideAudio(dto);
    return data;
  } catch (err) {
    dispatch(notify({ text: 'Update slide audio failed.', severity: 'error' }));
    // dispatch(setIsRecording(false));
    throw err;
  }
});

export const updateSlideOrder = createAsyncThunk(
  'slide/update/order',
  async (
    { slideID, order }: { slideID: number; order: number },
    { dispatch }
  ) => {
    try {
      const data = await api.updateSlideOrder(slideID, order);
      return data;
    } catch (err) {
      dispatch(
        notify({ text: 'Update slide order failed.', severity: 'error' })
      );
      console.log(err);
    }
  }
);

export const deleteSlideAudio = createAsyncThunk(
  'slide/delete/audio',
  async (slideID: number, { dispatch }) => {
    try {
      const data = await api.deleteSlideAudio(slideID);
      return data;
    } catch (err) {
      dispatch(
        notify({ text: 'Delete slide audio failed.', severity: 'error' })
      );
      console.log(err);
    }
  }
);

export const deleteSlide = createAsyncThunk(
  'slide/delete',
  async (slideID: number, { dispatch }) => {
    try {
      await api.deleteSlide(slideID);
      dispatch(notify({ text: 'Slide deleted!', severity: 'info' }));
      return slideID;
    } catch (err) {
      dispatch(notify({ text: 'Delete slide failed.', severity: 'error' }));
      console.log(err);
    }
  }
);

export const uploadPresentation = createAsyncThunk(
  'presentation/upload',
  async (presentation: IPresentationResponse, { dispatch }) => {
    try {
      const audioUrls = extractAudioUrls(presentation);
      const proms = audioUrls.map(async (uri) => {
        const res = await fetch(uri.toString(), { cache: 'no-cache' });
        return res.blob();
      });
      const blobs = await Promise.all(proms);
      const blob = new Blob([...blobs]);
      const res = await api.updatePresentation(presentation.url, {
        audio: blob,
      });
      dispatch(
        notify({ text: 'Presentation audio regenerated!', severity: 'info' })
      );
      return res;
    } catch (err) {
      dispatch(
        notify({
          text: 'Presentation audio regenerate failed.',
          severity: 'error',
        })
      );
      console.log(err);
    }
  }
);
