import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { setBaseUrls } from './helper/baseUrl';
import { history } from './helper/history';
import ConfigureStore from './package/store';
import reportWebVitals from './reportWebVitals';

/**
 * components
 */
import App from './App';
let xhrConfig: any;

const fetchConfig = () =>
  new Promise((resolve, reject) => {
    xhrConfig = new XMLHttpRequest();
    xhrConfig.open('GET', '/config.json', true);
    xhrConfig.setRequestHeader('Cache-Control', 'no-cache');
    xhrConfig.onload = resolve;
    xhrConfig.onerror = reject; // () => reject(xhrConfig.statusText); //  console.error(xhrConfig.statusText);
    xhrConfig.send(null);
  });

function onConfigResult(config: any) {
  // set base properties
  setBaseUrls({
    baseUrl: config.baseUrlForApi,
  });
  if (process.env.NODE_ENV !== 'development') console.log = () => {};
}

function requestOnLoad() {
  if (xhrConfig.readyState === 4 && xhrConfig.status === 200) {
    let serverConfig = JSON.parse(xhrConfig.responseText);
    onConfigResult(serverConfig);
    const { store, persistor } = ConfigureStore();
    ReactDOM.render(
      <React.StrictMode>
        <React.Suspense fallback='loading...'>
          <Router history={history}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <App />
              </PersistGate>
            </Provider>
          </Router>
        </React.Suspense>
      </React.StrictMode>,
      document.getElementById('root')
    );
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: https://bit.ly/CRA-PWA
    reportWebVitals();
  }
}

fetchConfig().then(requestOnLoad).catch();
