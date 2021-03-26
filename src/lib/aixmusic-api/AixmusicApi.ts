import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import { IPresentationResponse, ISlideResponse } from '../../types/AixmusicApiTypes';
import { ICreatePresentationDTO, ICreateSlideDTO, IUpdatePresentationDTO, IUpdateSlideDTO } from '../../types/AixmusicDTOTypes';
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

  public async createPresentation(dto: ICreatePresentationDTO): Promise<IPresentationResponse> {
    return await this.instance.post(`presentations/create`, dto);
  }

  public async updatePresentation(url: string, dto: IUpdatePresentationDTO): Promise<IPresentationResponse> {
    return await this.instance.post(`presentations/${url}/update`, dto);
  } 

  public async deletePresentation(url: string): Promise<string> {
    return await this.instance.post(`presentations/${url}/delete`);
  } 

  public async createSlide(url: string, dto: ICreateSlideDTO): Promise<ISlideResponse> {
    return await this.instance.post(`slides/${url}/create`, dto);
  }

  public async updateSlide(slideID: number, dto: IUpdateSlideDTO): Promise<ISlideResponse> {
    return await this.instance.post(`slide/${slideID}/update`, dto);
  }

  public async deleteSlide(slideID: number): Promise<string> {
    return await this.instance.post(`slide/${slideID}/delete`);
  }

  handleRequest(config: AxiosRequestConfig) {
    config.headers["Authorization"] = "bearer " + token;
    return config;
  }

  handleResponse(res: AxiosResponse) {
    return camelcaseKeys(res.data, {deep: true});
  }

  handleError(error: AxiosError): never {
    throw error;
  }
}
