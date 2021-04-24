import React from 'react';
import { Switch, Route } from 'react-router-dom';
//@ts-ignore
import loadable from '@loadable/component';
import { Container } from '@material-ui/core';
import { THeader } from './components/simple/THeader';

const MainContainer = loadable(() => import('./module/main/MainContainer'), {
  fallback: 'Loading...',
});

const TemplateContainer = loadable(() => import('./module/template/TemplateContainer'), {
  fallback: 'Loading...',
});

const SignInContainer = loadable(() => import('./module/auth/SingUpContainer'), {
  fallback: 'Loading...',
});

function App() {
  return (
    <>
      <THeader />
      <Container maxWidth='md' component='main'>
        <Switch>
          <Route exact path='/' component={MainContainer} />
          <Route exact path='/template/create' component={TemplateContainer} />
          <Route exact path='/signin' component={SignInContainer} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
