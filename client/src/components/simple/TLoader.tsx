import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';

export const TLoader: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <Grid container justify='center' alignItems='center'>
      <CircularProgress />
    </Grid>
  );
};
TLoader.defaultProps = {
  isLoading: false,
};
