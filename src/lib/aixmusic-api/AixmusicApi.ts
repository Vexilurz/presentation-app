import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import {
  IPresentationResponse,
  ISlideResponse,
} from '../../types/AixmusicApiTypes';
import {
  ICreatePresentationDTO,
  ICreateSlideDTO,
  IUpdatePresentationDTO,
  IUpdateSlideDTO,
} from '../../types/AixmusicDTOTypes';
import { HttpClient } from '../http-client/HttpClient';

const baseUrl = process.env.REACT_APP_BASE_URL as string;
const token = process.env.REACT_APP_TOKEN as string;

export class AixmusicApi extends HttpClient {
  private static classInstance?: AixmusicApi;

  private constructor() {
    super(baseUrl);
  }

  public static getInstance() {
    if (!this.classInstance) {
      this.classInstance = new AixmusicApi();
    }

    return this.classInstance;
  }

  public async getPresentation(url: string): Promise<IPresentationResponse> {
    return await this.instance.get(`presentations/${url}`);
  }

  public async createPresentation(
    dto: ICreatePresentationDTO
  ): Promise<IPresentationResponse> {
    return await this.instance.post(`presentations/create`, dto);
  }

  public async updatePresentation(
    url: string,
    dto: IUpdatePresentationDTO
  ): Promise<IPresentationResponse> {
    let formData = new FormData();
    if (dto.audio) formData.append('audio', dto.audio, 'audio.mp3');
    if (dto.description) formData.append('description', dto.description);
    if (dto.title) formData.append('title', dto.title);
    return await this.instance.post(`presentations/${url}/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  public async deletePresentation(url: string): Promise<string> {
    return await this.instance.post(`presentations/${url}/delete`);
  }

  public async createSlide(
    url: string,
    dto: ICreateSlideDTO
  ): Promise<ISlideResponse> {
    let formData = new FormData();
    formData.append('order', dto.order.toString());
    if (dto.audio) formData.append('audio', dto.audio, 'audio.mp3');
    formData.append('image', dto.image, 'image.png');
    formData.append('duration', dto.duration.toString());
    return await this.instance.post(`slides/${url}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  public async createSlideImageOnly(
    url: string,
    image: Blob
  ): Promise<ISlideResponse> {
    let formData = new FormData();
    formData.append('image', image, 'image.png');
    return await this.instance.post(`slides/${url}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  public async updateSlide(
    slideID: number,
    dto: IUpdateSlideDTO
  ): Promise<ISlideResponse> {
    let formData = new FormData();
    formData.append('order', dto.order.toString());
    formData.append('audio', dto.audio, 'audio.mp3');
    formData.append('image', dto.image, 'image.png');
    formData.append('duration', dto.duration.toString());
    return await this.instance.post(`slide/${slideID}/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  public async updateSlideImage(
    slideID: number,
    image: Blob
  ): Promise<ISlideResponse> {
    let formData = new FormData();
    formData.append('image', image, 'image.png');
    return await this.instance.post(`slide/${slideID}/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  public async updateSlideAudio(
    slideID: number,
    audio: Blob,
    duration: number
  ): Promise<ISlideResponse> {
    let formData = new FormData();
    // TODO: append silence file (blob) when blob do not exist
    formData.append('audio', audio, 'audio.mp3');
    formData.append('duration', duration.toString())
    return await this.instance.post(`slide/${slideID}/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  public async deleteSlideAudio(slideID: number): Promise<ISlideResponse> {
    return await this.instance.post(`slide/${slideID}/update`, {
      audio: 'DELETE',
    });
  }

  public async deleteSlideImage(slideID: number): Promise<ISlideResponse> {
    return await this.instance.post(`slide/${slideID}/update`, {
      image: 'DELETE',
    });
  }

  public async updateSlideOrder(
    slideID: number,
    order: number
  ): Promise<ISlideResponse> {
    let formData = new FormData();
    formData.append('order', order.toString());
    return await this.instance.post(`slide/${slideID}/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  public async deleteSlide(slideID: number): Promise<string> {
    return await this.instance.post(`slide/${slideID}/delete`);
  }

  handleRequest(config: AxiosRequestConfig) {
    config.headers['Authorization'] = 'bearer ' + token;
    return config;
  }

  handleResponse(res: AxiosResponse) {
    return camelcaseKeys(res.data, { deep: true });
  }

  handleError(error: AxiosError): never {
    throw error;
  }
}
