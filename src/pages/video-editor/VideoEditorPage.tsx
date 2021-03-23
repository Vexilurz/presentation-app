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
    <div>
      Video Editor page
    </div>
  );
};
