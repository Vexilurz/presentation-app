import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainPage } from './main/MainPage';
import { VideoEditorPage } from './video-editor/VideoEditorPage';
import { VideoPlayerPage } from './video-player/VideoPlayerPage';

interface Props {}

export const AppRoutes = (props: Props) => {
  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route path="/editor/:presentationUrl?">
        <VideoEditorPage />
      </Route>
      <Route path="/player">
        <VideoPlayerPage />
      </Route>
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};
