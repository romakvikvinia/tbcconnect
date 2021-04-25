import React, { useEffect } from 'react';
import { Box, Grid, TextField, Button } from '@material-ui/core';
import { useFormik } from 'formik';
import { SignInSchema } from './validationSchema';
import { fetchLogin } from '../../api/auth.api';
import { useDispatch, useSelector } from 'react-redux';
import { startFetchUserCredentials } from '../../package/store/actions/user.action';
import { TLoader } from '../../components/simple/TLoader';
import { history } from '../../helper/history';
import { reselectUser } from '../../package/store/reselect/user.reselect';
import { useLocation } from 'react-router';

const SingInContainer: React.FC<{}> = () => {
  const { state } = useLocation<{ from: string }>();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(reselectUser);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: async ({ username, password }, methods) => {
      try {
        methods.setSubmitting(true);
        const data: any = await fetchLogin({ username, password });
        methods.setSubmitting(false);
        dispatch(startFetchUserCredentials(data));
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      history.push({ pathname: `${state && state.from ? state.from : '/'}` });
    }
  }, [isAuthenticated, state]);
  return (
    <>
      <TLoader isLoading={formik.isSubmitting} />
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
              type='password'
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
              disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
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
export default SingInContainer;
