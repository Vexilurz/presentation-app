import { createAsyncThunk } from '@reduxjs/toolkit';
import { AixmusicApi } from '../../lib/aixmusic-api/AixmusicApi';
import { ICreatePresentationDTO, ICreateSlideDTO, IUpdatePresentationDTO, IUpdateSlideDTO } from '../../types/AixmusicDTOTypes';

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

export const createPresentation = createAsyncThunk('presentation/create', 
async ( dto: ICreatePresentationDTO, { dispatch }) => {
  try {
    const data = await api.createPresentation(dto);
    return data;
  } catch (err) {
    // Here we can check errors and dispatch some actions if is needed
    throw err;
  }
});

export const updatePresentation = createAsyncThunk('presentation/update', 
async ( {url, dto}: {url: string, dto: IUpdatePresentationDTO}, { dispatch }) => {
  try {
    const data = await api.updatePresentation(url, dto);
    return data;
  } catch (err) {
    // Here we can check errors and dispatch some actions if is needed
    throw err;
  }
});

export const deletePresentation = createAsyncThunk('presentation/delete', 
async ( url: string, { dispatch }) => {
  try {
    const data = await api.deletePresentation(url);
    return data;
  } catch (err) {
    // Here we can check errors and dispatch some actions if is needed
    throw err;
  }
});

export const createSlide = createAsyncThunk('slide/create', 
async ( {url, dto}: {url: string, dto: ICreateSlideDTO}, { dispatch }) => {
  try {
    const data = await api.createSlide(url, dto);
    return data;
  } catch (err) {
    // Here we can check errors and dispatch some actions if is needed
    throw err;
  }
});

export const createSlideImageOnly = createAsyncThunk('slide/create/image', 
async ( {url, image}: {url: string, image: Blob}, { dispatch }) => {
  try {
    const data = await api.createSlideImageOnly(url, image);
    return data;
  } catch (err) {
    // Here we can check errors and dispatch some actions if is needed
    throw err;
  }
});

export const updateSlide = createAsyncThunk('slide/update', 
async ( {slideID, dto}: {slideID: number, dto: IUpdateSlideDTO}, { dispatch }) => {
  try {
    const data = await api.updateSlide(slideID, dto);
    return data;
  } catch (err) {
    // Here we can check errors and dispatch some actions if is needed
    throw err;
  }
});

export const updateSlideAudio = createAsyncThunk('slide/update/audio', 
async ( {slideID, audio, duration}: {slideID: number, audio: Blob, duration: number}, { dispatch }) => {
  try {
    const data = await api.updateSlideAudio(slideID, audio, duration);
    return data;
  } catch (err) {
    // Here we can check errors and dispatch some actions if is needed
    throw err;
  }
});

export const deleteSlideAudio = createAsyncThunk('slide/delete/audio', 
async ( slideID: number, { dispatch }) => {
  try {
    const data = await api.deleteSlideAudio(slideID);
    return data;
  } catch (err) {
    // Here we can check errors and dispatch some actions if is needed
    throw err;
  }
});

export const deleteSlide = createAsyncThunk('slide/delete', 
async ( slideID: number, { dispatch }) => {
  try {
    const data = await api.deleteSlide(slideID);
    alert('Slide deleted!')
    return slideID;
  } catch (err) {
    // Here we can check errors and dispatch some actions if is needed
    throw err;
  }
});