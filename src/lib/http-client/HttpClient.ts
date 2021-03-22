import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const AXIOS_TIMEOUT = 20000;

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      timeout: AXIOS_TIMEOUT
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this.handleRequest,
      this.handleError,
    );
  };

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError,
    );
  };


  protected abstract  handleRequest (config: AxiosRequestConfig): AxiosRequestConfig;

  protected abstract handleResponse ({ data }: AxiosResponse): any;

  protected abstract handleError(error: AxiosError): never;
}