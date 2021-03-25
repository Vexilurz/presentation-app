export interface IApiPresentation {
  id: number,
  title: string,
  description: string,
  views: number,
  private: number,
  password: string,
  userId: number,
  url: string,
  createdAt?: string,
  updatedAt?: string,
  audio: string,
  slides: IApiSlide[],
}

export interface IApiSlide {
  id: number,
  presentationUrl: string,
  order: number,
  audio: string,
  image: string,
  duration: number,
  userId: number,
  createdAt?: string,
  updatedAt?: string,
}

// CreateUserDTO