import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import camelcaseKeys from 'camelcase-keys';
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

  // TODO: Add types
  public async getPresentation(url: string): Promise<any> {
    return await this.instance.get(`presentations/${url}`);
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
