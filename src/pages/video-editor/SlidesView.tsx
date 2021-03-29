import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import PdfReader from '../../lib/pdf/PdfReader';
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

  // @ts-ignore
  const handleFile = ({ target }) => {
    const files = Array.from(target.files)    
    const fileReader = new FileReader();  

    fileReader.onload = function() {
      // @ts-ignore
      const typedarray = new Uint8Array(this.result);
      PdfReader(typedarray, props.presentationUrl);
    };
    // @ts-ignore
    fileReader.readAsArrayBuffer(files[0]);
  }

  return (
    <div>
      SlidesView component {props.presentationUrl}

      {state.presentation.slides?.map((slide) => 
        (
          <SlidePreview slide={slide} />
        ))
      }

      <input
        type="file"
        onChange={handleFile}
        accept='application/pdf'
      />
    </div>
  )
}
