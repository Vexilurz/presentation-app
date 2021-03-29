export interface ICreatePresentationDTO {
  title: string;
}

export interface IUpdatePresentationDTO {
  title: string;
  description: string;
  audio: Blob;
}

export interface ICreateSlideDTO {
  order: number;
  audio: Blob;
  image: Blob;
  duration: number;
}

export interface IUpdateSlideDTO {
  order: number;
  audio: Blob;
  image: Blob;
  duration: number;
}