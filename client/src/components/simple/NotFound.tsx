import React from 'react';
import { Typography } from '@material-ui/core';

const NotFound: React.FC<{}> = () => {
  return (
    <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
      Page Not Found
    </Typography>
  );
};
export default NotFound;
