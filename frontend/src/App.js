import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';

import store from './reducers';
import * as routes from './routes';

import Login from './containers/login';
import Navbar from './components/navbar';
import Root from './components/root';

import NotFound from './components/notFound';

import sessionHelpers from './utils/sessionHelpers';

const protectedRoutes = [
  { path: '/', container: Root },
];

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Switch>
          <Route exact path={routes.LOGIN_URL} component={Login} />

          <Route
            render={() => {
              if (!sessionHelpers.currentUser()) {
                return (<Redirect to={routes.LOGIN_URL} />);
              }

              return (
                <Fragment>
                  <Navbar />

                  <div className="container-fluid">
                    <div className="row">
                      <Switch>
                        {
                          protectedRoutes.map(route => (
                            <Route
                              exact
                              key={route.path}
                              path={route.path}
                              component={route.container}
                            />
                          ))
                        }

                        <NotFound />
                      </Switch>
                    </div>
                  </div>
                </Fragment>
              );
            }}
          />
        </Switch>
      </Fragment>
    </BrowserRouter>

    <ToastContainer />
  </Provider>
);

export default App;
