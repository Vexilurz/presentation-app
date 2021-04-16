export interface Slideshow {
  img: string;
  endTime: number;
  audio: string;
}

export interface BoolValue {
  value: boolean;
}

export type ThunkStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
