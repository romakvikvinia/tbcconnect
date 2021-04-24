import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();
// export const history = createBrowserHistory({forceRefresh:true})
history.listen((location, action) => {
  if (action === 'POP') {
    history.replace(location.pathname, {});
  }
});
