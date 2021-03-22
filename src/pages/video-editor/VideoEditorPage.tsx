import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getPresentation } from '../../redux/presentation/presentationThunks';
import { RootState } from '../../redux/rootReducer';
import { useAppDispatch } from '../../redux/store';

interface Props {}

export const VideoEditorPage = (props: Props) => {
  const url = 'test';
  const state = useSelector((state: RootState) => state.presentation);
  const dispatch = useAppDispatch();

  useEffect( () => {
    dispatch(getPresentation(url))
  }, [])

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-grow">
        <div className="w-1/4 bg-secondary-500"></div>
        <div className="w-3/4 bg-primary-900">
        </div>
      </div>
      <div className="w-full h-16 bg-secondary-600 px-16 flex items-center">
        <span className='text-white'>{`Presentation fetch status: ${state.status}`}</span>
      </div>
    </div>
  );
};
