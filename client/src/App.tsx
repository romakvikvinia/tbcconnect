import React from 'react';
import { Switch, Route } from 'react-router-dom';
//@ts-ignore
import loadable from '@loadable/component';
import { Container } from '@material-ui/core';
import { THeader } from './components/simple/THeader';
import { TLoader } from './components/simple/TLoader';
import { PrivateRoute } from './components/simple/PrivateRoute';

const MainContainer = loadable(() => import('./module/main/MainContainer'), {
  fallback: <TLoader isLoading={true} />,
});

const TemplateContainer = loadable(() => import('./module/template/TemplateContainer'), {
  fallback: <TLoader isLoading={true} />,
});

const SignInContainer = loadable(() => import('./module/auth/SingInContainer'), {
  fallback: <TLoader isLoading={true} />,
});

function App() {
  return (
    <>
      <THeader />
      <Container maxWidth='md' component='main'>
        <Switch>
          <Route exact path='/' component={MainContainer} />
          <PrivateRoute exact path='/template/create' component={TemplateContainer} />
          <Route exact path='/signin' component={SignInContainer} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
