import {
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PdfReader from '../../lib/pdf/PdfReader';
import {
  getPresentation,
  updateSlideOrder,
} from '../../redux/presentation/presentationThunks';
import { RootState } from '../../redux/rootReducer';
import { useAppDispatch } from '../../redux/store';
import { SlidePreview } from './SlidePreview';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { setPresentationSlides } from '../../redux/presentation/presentationSlice';
import { ISlideResponse } from '../../types/AixmusicApiTypes';

interface Props {
  presentationUrl: string;
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  width: '100%',
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflowY: 'scroll',
      maxHeight: 'calc(100% - 50px)',
      padding: '5px 0',
      display: 'flex',
      flexDirection: 'column',
      justifyItems: 'center',
      alignItems: 'center',
    },
  })
);

export const SlidesView = (props: Props) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const state = useSelector((state: RootState) => state.presentation);
  const classes = useStyles();
  useEffect(() => {
    dispatch(getPresentation(props.presentationUrl));
  }, [history]);

  const reorder = (
    list: ISlideResponse[],
    startIndex: number,
    endIndex: number
  ): ISlideResponse[] => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result.map((item, index) => {
      const retItem = { ...item, order: index };
      // TODO: maybe freeze
      dispatch(updateSlideOrder({ slideID: retItem.id, order: retItem.order }));
      return retItem;
    });
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      state.presentation.slides,
      result.source.index,
      result.destination.index
    );

    dispatch(setPresentationSlides(items));
  };

  return (
    <div className={classes.root}>
      {state.status === 'loading' ? (
        <CircularProgress color="secondary" />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {
              // @ts-ignore
              (provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {state.presentation.slides?.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id.toString()}
                      index={index}
                    >
                      {
                        // @ts-ignore
                        (provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                          >
                            <SlidePreview slide={item} key={item.id} />
                          </div>
                        )
                      }
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )
            }
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};
