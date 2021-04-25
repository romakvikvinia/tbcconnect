import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
//@ts-ignore
import loadable from '@loadable/component';
import { THeader } from './components/simple/THeader';
import { TLoader } from './components/simple/TLoader';
import { PrivateRoute } from './components/simple/PrivateRoute';

// css
import 'react-toastify/dist/ReactToastify.css';

//components

const MainContainer = loadable(() => import('./module/main/MainContainer'), {
  fallback: <TLoader isLoading={true} />,
});

const TemplateContainer = loadable(() => import('./module/template/TemplateContainer'), {
  fallback: <TLoader isLoading={true} />,
});
const TemplateDetailContainer = loadable(() => import('./module/template/TemplateDetailContainer'), {
  fallback: <TLoader isLoading={true} />,
});

const NotFoundContainer = loadable(() => import('./components/simple/NotFound'), {
  fallback: <TLoader isLoading={true} />,
});

const SignInContainer = loadable(() => import('./module/auth/SingInContainer'), {
  fallback: <TLoader isLoading={true} />,
});

function App() {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <THeader />
      <Container maxWidth='md' component='main'>
        <Switch>
          <Route exact path='/' component={MainContainer} />
          <PrivateRoute exact path='/template/create' component={TemplateContainer} />
          <Route exact path='/template/:id' component={TemplateDetailContainer} />
          <Route exact path='/signin' component={SignInContainer} />
          <Route component={NotFoundContainer} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
