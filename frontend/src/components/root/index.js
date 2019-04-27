import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import {
  Card, Row, Col, Button,
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';

import Api from '../../api';

import studentsActions from '../../actionCreators/students';

import StandardSelector from './standardSelector';
import Students from './students';
import Texter from './texter';

const Attendance = () => {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <Fragment>
      <Row className="mt-5">
        <Col md="2" />
        <Col md="8">
          <Card body outline color="secondary">
            <Nav tabs className="mt-3">
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { setActiveTab('1'); }}
                >
                  Swiper
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { setActiveTab('2'); }}
                >
                  Texter
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab} className="mt-3">
              <TabPane tabId="1">
                <Students />
              </TabPane>
            </TabContent>

            <TabContent activeTab={activeTab} className="mt-3">
              <TabPane tabId="2">
                <Texter />
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>

      <div className="m-5 text-center">
        <Button color="success">Save</Button>
      </div>
    </Fragment>
  );
};

const Root = (props) => {
  const [loading, setLoading] = useState(false);

  const loadStudents = (standardId) => {
    const promise = Api.students(standardId);

    setLoading(true);
    promise
      .then((response) => {
        props.importStudents(response.data.data);
        setLoading(false);
      }).catch(() => setLoading(false));

    return promise;
  };

  return (
    <div className="mt-5 col-md-12">
      <StandardSelector loadStudents={loadStudents} />
      {
        loading
          ? <div />
          : <Attendance />
      }
    </div>
  );
};

const mapStateToProps = state => ({
  students: state.students,
});

const mapDispatchToProps = dispatch => ({
  importStudents(list) {
    dispatch(studentsActions.import(list));
  },
});

Root.propTypes = {
  importStudents: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
