import { Container, Typography } from '@material-ui/core';
import React from 'react';

interface Props {}

export const MainPage = (props: Props) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3">Main page</Typography>
    </Container>
  );
};
