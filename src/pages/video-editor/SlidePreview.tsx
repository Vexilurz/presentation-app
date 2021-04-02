import React from 'react'
import { setSelectedSlideId } from '../../redux/presentation/presentationSlice';
import { useAppDispatch } from '../../redux/store';
import { ISlideResponse } from '../../types/AixmusicApiTypes'

const uploadsUrl = process.env.REACT_APP_UPLOADS_URL as string;
interface Props {
  slide: ISlideResponse,
}

export const SlidePreview = (props: Props) => {
  const dispatch = useAppDispatch();
  // TODO: fix onClick
  return (
    <div className="slide-preview">
      {`Slide ID: ${props.slide.id}`}
      <br></br>      
      <img src={`${uploadsUrl}${props.slide.image}`} width="30%" height="30%" 
        onClick={()=>{          
          dispatch(setSelectedSlideId(props.slide.id))
        }}
      />
    </div>
  )
}
