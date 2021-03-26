import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getPresentation } from '../../redux/presentation/presentationThunks';
import { RootState } from '../../redux/rootReducer';
import { useAppDispatch } from '../../redux/store';
import { SlidePreview } from './SlidePreview';

interface Props {
  presentationUrl: string,
}

export const SlidesView = (props: Props) => {
  const dispatch = useAppDispatch();
  const state = useSelector((state: RootState) => state.presentation);

  useEffect(() => {
    dispatch(getPresentation(props.presentationUrl));
  }, []);

  return (
    <div>
      SlidesView component {props.presentationUrl}

      {state.presentation.slides?.map((slide) => 
        (
          <SlidePreview slide={slide} />
        ))
      }

      <button onClick={() => {}}>
        Add slides
      </button>
    </div>
  )
}
