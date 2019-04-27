import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import {
  Card, Row, Col,
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';

import Api from '../../api';

import studentsActions from '../../actionCreators/students';

import StandardSelector from './standardSelector';
import Students from './students';
import Texter from './texter';
import ConfirmationButton from './confirmationButton';

const Attendance = (props) => {
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  const submitAttendance = () => {
    setSubmitting(true);

    Api.submitAttendance(props.absentStudents, props.standardId)
      .then(() => setSubmitting(false))
      .catch(() => setSubmitting(false));
  };

  const buttonClasses = () => classnames({ 'btn-loading': submitting });

  return (
    <Fragment>
      <Row className="mt-5">
        <Col md="2" />
        <Col md="8">
          <Card body outline color="secondary">
            <h6
              className="text-center text-success"
              hidden={props.students.attendance_taken !== true}
            >
              Attendance has already been taken!!!
            </h6>

            <Nav tabs className="mt-3">
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '1' })}
                  onClick={() => { setActiveTab('1'); }}
                >
                  Via Student Cards
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === '2' })}
                  onClick={() => { setActiveTab('2'); }}
                >
                  Via Text
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
        <ConfirmationButton
          className={buttonClasses()}
          students={props.students.students}
          onConfirm={submitAttendance}
          color="success"
          disabled={
            props.students.attendance_taken === undefined
            || props.students.attendance_taken === true
          }
        >
          Confirm
        </ConfirmationButton>
      </div>
    </Fragment>
  );
};

Attendance.propTypes = {
  students: PropTypes.shape({
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
    attendance_taken: PropTypes.bool,
  }).isRequired,

  absentStudents: PropTypes.arrayOf(PropTypes.number).isRequired,
  standardId: PropTypes.number.isRequired,
};

const Root = (props) => {
  const [loading, setLoading] = useState(false);
  const [selectedStandardId, setSelectedStandardId] = useState(0);

  const loadStudents = (standardId) => {
    const promise = Api.students(standardId);

    setLoading(true);
    setSelectedStandardId(standardId);

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
          ? <div className="center-spinner">Loading...</div>
          : (
            <Attendance
              students={props.students}
              absentStudents={props.absentStudents}
              standardId={selectedStandardId}
            />
          )
      }
    </div>
  );
};

const mapStateToProps = state => ({
  students: state.students,
  absentStudents: state.absentStudents,
});

const mapDispatchToProps = dispatch => ({
  importStudents(list) {
    dispatch(studentsActions.import(list));
  },
});

Root.propTypes = {
  students: PropTypes.shape({
    attendance_taken: PropTypes.bool,
    students: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  absentStudents: PropTypes.arrayOf(PropTypes.number).isRequired,
  importStudents: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
