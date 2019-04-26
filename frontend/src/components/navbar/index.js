import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
} from 'reactstrap';

import * as routes from '../../routes';

const DefaultNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavLink to={routes.ROOT_URL} className="navbar-brand">
          Attendance
        </NavLink>

        <NavbarToggler onClick={() => setIsOpen(!isOpen)} />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavLink to={routes.LOGIN_URL} className="nav-link">Log Out</NavLink>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default DefaultNavbar;
