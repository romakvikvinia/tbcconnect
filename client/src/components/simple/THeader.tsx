import React, { useCallback } from 'react';
import { AppBar, Button, CssBaseline, Toolbar, Typography, Avatar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { history } from '../../helper/history';
import { useDispatch, useSelector } from 'react-redux';
import { reselectUser } from '../../package/store/reselect/user.reselect';
import { startFetchLogOut } from '../../package/store/actions/user.action';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    textDecoration: 'none',
  },
}));

export const THeader = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(reselectUser);

  /**
   * methods
   */

  const handleRedirectToSignIn = useCallback(() => {
    history.push({
      pathname: '/signin',
    });
  }, []);

  const handelRedirectHome = useCallback(() => {
    history.push({
      pathname: '/',
    });
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(startFetchLogOut());
  }, [dispatch]);

  return (
    <>
      <CssBaseline />
      <AppBar position='static' color='default' elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant='h6'
            color='inherit'
            noWrap
            className={classes.toolbarTitle}
            onClick={handelRedirectHome}
            style={{ cursor: 'pointer' }}
          >
            TBCConnect
          </Typography>
          <nav>
            <Link to='/' className={classes.link}>
              Main
            </Link>
            {isAuthenticated ? (
              <Link to='/template/create' className={classes.link}>
                Create
              </Link>
            ) : null}
          </nav>
          {isAuthenticated ? (
            <Button onClick={handleLogout}>
              <Avatar>
                <AccountCircle />
              </Avatar>
            </Button>
          ) : (
            <Button onClick={handleRedirectToSignIn} color='primary' variant='outlined' className={classes.link}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
