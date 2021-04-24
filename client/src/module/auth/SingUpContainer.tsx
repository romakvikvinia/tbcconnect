import React from 'react';
import { Box, Grid, TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { SignInSchema } from './validationSchema';

const SingUpContainer: React.FC<{}> = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: async ({ username, password }, methods) => {
      try {
      } catch (error) {}
    },
  });

  return (
    <>
      <Grid container justify='center' alignItems='center'>
        <Box mt={6} width={1 / 2}>
          <Grid item>
            <TextField
              id='username'
              label='username'
              fullWidth
              value={formik.values.username}
              onChange={formik.handleChange('username')}
              onBlur={formik.handleBlur('username')}
              error={'username' in formik.errors && 'username' in formik.touched}
            />
          </Grid>

          <Grid item>
            <TextField
              id='password'
              label='password'
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange('password')}
              onBlur={formik.handleBlur('password')}
              error={'password' in formik.errors && 'password' in formik.touched}
            />
          </Grid>
          <br />
          <Grid item>
            <Button
              variant='outlined'
              color='primary'
              fullWidth
              disabled={!formik.dirty || formik.isSubmitting || !formik.isValid}
              onClick={formik.submitForm}
            >
              Sign in
            </Button>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
export default SingUpContainer;
