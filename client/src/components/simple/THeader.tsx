import React, { useCallback } from 'react';
import { AppBar, Button, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { history } from '../../helper/history';

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

            <Link to='/template/create' className={classes.link}>
              Create
            </Link>
          </nav>
          <Button onClick={handleRedirectToSignIn} color='primary' variant='outlined' className={classes.link}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};
