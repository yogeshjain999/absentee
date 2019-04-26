import React, { Fragment } from 'react';

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
                      <div className="content-wrapper">
                        <Switch>
                          {
                            protectedRoutes.list.map(route => (
                              <Route
                                exact
                                key={route.path}
                                path={route.path}
                                component={containerMappings[route.container]}
                              />
                            ))
                          }

                          <NotFound />
                        </Switch>
                      </div>
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
