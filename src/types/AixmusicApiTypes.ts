export interface IPresentationResponse {
  id: number,
  title: string,
  description: string,
  views: number,
  private: number,
  password: string,
  userId: number,
  url: string,
  createdAt: string,
  updatedAt: string,
  audio: string,
  slides?: ISlideResponse[], // slides don't exist when creating presentation
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
