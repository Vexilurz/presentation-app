export interface IPresentationResponse {
  title: string,
  description: string,
  views: number,
  private: number,
  url: string,
  slides: ISlideResponse[], // slides don't exist when creating presentation
  whitelabel: number,
}

export interface ISlideResponse {
  id: number,
  presentationUrl: string,
  order: number,
  audio: string,
  image: string,
  duration: number,
  userId: number,
  createdAt: string,
  updatedAt: string,
}
