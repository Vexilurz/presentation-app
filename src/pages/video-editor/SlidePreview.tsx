import React from 'react'
import { setSelectedSlide } from '../../redux/presentation/presentationSlice';
import { ISlideResponse } from '../../types/AixmusicApiTypes'

const uploadsUrl = process.env.REACT_APP_UPLOADS_URL as string;
interface Props {
  slide: ISlideResponse,
}

export const SlidePreview = (props: Props) => {
  // TODO: fix onClick
  return (
    <div className="slide-preview">
      {`Slide ID: ${props.slide.id}`}
      <br></br>      
      <img src={`${uploadsUrl}${props.slide.image}`} width="100" height="100" 
        onClick={()=>{setSelectedSlide(props.slide)}}
      />
    </div>
  )
}
