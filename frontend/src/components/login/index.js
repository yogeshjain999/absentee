import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Form, FormGroup, Input, Button,
} from 'reactstrap';

import sessionHelpers from '../../utils/sessionHelpers';
import Api from '../../api';
import * as routes from '../../routes';

import currentUserActions from '../../actionCreators/currentUser';

const Login = (props) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const doLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    Api.logIn(mobileNumber, password)
      .then((response) => {
        const user = sessionHelpers.getUserFrom(response);
        sessionHelpers.logIn(user);
        props.logIn(user);
      })
      .catch(() => { setLoading(false); });
  };

  const buttonClasses = () => classnames({ 'btn-loading': loading });

  if (props.currentUser) return (<Redirect to={routes.ROOT_URL} />);

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-md-12">
          <div className="d-flex align-items-center" style={{ marginLeft: 0, width: '100%', padding: '2rem 1.5rem' }}>
            <div className="card col-lg-4 offset-lg-4">
              <div className="card-block">
                <h3 className="card-title text-secondary text-left mb-5 mt-4">Login</h3>

                <Form onSubmit={doLogin}>
                  <FormGroup>
                    <Input placeholder="Mobile Number" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
                  </FormGroup>

                  <FormGroup>
                    <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                  </FormGroup>

                  <div className="text-center mb-3">
                    <Button className={buttonClasses()}>
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.currentUser,
});

const mapDispatchToProps = dispatch => ({
  logIn(user) {
    dispatch(currentUserActions.logIn(user));
  },
});

Login.defaultProps = {
  currentUser: null,
};

Login.propTypes = {
  logIn: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({}),
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
