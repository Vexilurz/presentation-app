export interface ICreatePresentationDTO {
  title: string;
}

export interface IUpdatePresentationDTO {
  title: string;
  description: string;
  audio: string;
}

export interface ICreateSlideDTO {
  order: number;
  audio: string;
  image: string;
  duration: number;
}

export interface IUpdateSlideDTO {
  order: number;
  audio: string;
  image: string;
  duration: number;
}