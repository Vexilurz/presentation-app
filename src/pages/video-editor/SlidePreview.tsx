import React from 'react'
import { ISlideResponse } from '../../types/AixmusicApiTypes'

interface Props {
  slide: ISlideResponse,
}

export const SlidePreview = (props: Props) => {
  return (
    <div className="slide-preview">
      {`Slide ID: ${props.slide.id}`}
    </div>
  )
}
