import React, { lazy, Suspense } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

const TheLayout = lazy(() => import('./containers/TheLayout'));
const Page404 = lazy(() => import('./views/pages/page404/Page404'));

const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/404"
            name="Page 404"
            render={props => <Page404 {...props} />}
          />
          <Route
            path="/"
            name="Home"
            render={props => <TheLayout {...props} />}
          />
        </Switch>
      </Suspense>
    </HashRouter>
  );
};

export default App;
