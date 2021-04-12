import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const AXIOS_TIMEOUT = 0;

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  protected token: string;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: AXIOS_TIMEOUT
    });
    this.token = '';

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this.handleRequest.bind(this),
      this.handleError.bind(this),
    );
  };

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this.handleResponse.bind(this),
      this.handleError.bind(this),
    );
  };


  protected abstract  handleRequest (config: AxiosRequestConfig): AxiosRequestConfig;

  protected abstract handleResponse ({ data }: AxiosResponse): any;

  protected abstract handleError(error: AxiosError): never;
}