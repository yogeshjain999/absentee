import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavItem,
  Nav,
} from 'reactstrap';

import * as routes from '../../routes';
import sessionHelpers from '../../utils/sessionHelpers';
import Api from '../../api';

const DefaultNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const logOut = (e) => {
    e.preventDefault();

    Api.logOut().then(() => {
      sessionHelpers.logOut();
      window.location.href = routes.LOGIN_URL; // eslint-disable-line
    });
  };

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavLink to={routes.ROOT_URL} className="navbar-brand">
          Attendance
        </NavLink>

        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink to="#" className="nav-link">
                Hi
                {' '}
                {props.currentUser.name}
              </NavLink>
            </NavItem>
            <NavItem>
              <Nav className="ml-auto" navbar>
                <NavLink to={routes.LOGIN_URL} className="nav-link" onClick={logOut}>
                  Log Out
                </NavLink>
              </Nav>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: state.currentUser,
});

DefaultNavbar.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, null)(DefaultNavbar);
