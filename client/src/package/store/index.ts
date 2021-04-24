import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import RootReducer from './reducers';

//saga
import RootSaga from './saga';

const persistConfig = {
  key: 'tbc_connect',
  storage,
  whiteList: [],
  blacklist: [],
};

export let store: any;

const configureStore = () => {
  let persistor;
  const sagaMiddleware = createSagaMiddleware();
  let middlewares = [sagaMiddleware];
  const persistedReducer = persistReducer(persistConfig, RootReducer);

  if (process.env.NODE_ENV === 'development') {
    store = createStore(
      persistedReducer,
      compose(
        applyMiddleware(...middlewares),
        //@ts-ignore
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    );
  } else {
    store = createStore(persistedReducer, compose(applyMiddleware(...middlewares)));
  }
  persistor = persistStore(store);

  sagaMiddleware.run(RootSaga);

  return { store, persistor };
};

export default configureStore;
