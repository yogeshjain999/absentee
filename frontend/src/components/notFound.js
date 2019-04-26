import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as routes from '../routes';

const NotFound = props => (
  <div className="d-flex align-items-center text-center error-page">
    <div className="col-lg-6 offset-lg-3">
      <h1 className="display-1">404</h1>
      <h4>{props.description}</h4>
      <Link to={routes.ROOT_URL} className="btn btn-info mt-5">Back to home</Link>
    </div>
  </div>
);

NotFound.defaultProps = {
  description: 'The page you are looking does not exist!',
};

NotFound.propTypes = {
  description: PropTypes.string,
};

export default NotFound;
