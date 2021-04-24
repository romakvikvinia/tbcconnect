import React from 'react';
import { Box, Grid, TextField, Button } from '@material-ui/core';
const SingUpContainer = () => {
  return (
    <>
      <Grid container justify='center' alignItems='center'>
        <Box mt={6} width={1 / 2}>
          <Grid item>
            <TextField id='username' label='username' fullWidth />
          </Grid>

          <Grid item>
            <TextField id='password' label='password' fullWidth />
          </Grid>
          <br />
          <Grid item>
            <Button variant='outlined' color='primary' fullWidth>
              Primary
            </Button>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
export default SingUpContainer;
