import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  Card, Row, Col,
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';

import Api from '../../api';
import storageHelpers from '../../utils/storageHelpers';

import Students from './students';
import Texter from './texter';
import ConfirmationButton from './confirmationButton';

const Attendance = (props) => {
  const [attendanceTaken, setAttendanceTaken] = useState(props.students.attendance_taken);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('1');

  const submitAttendance = () => {
    setSubmitting(true);

    Api.submitAttendance(props.absentStudents, props.standardId)
      .then(() => {
        setSubmitting(false);
        setAttendanceTaken(true);
        storageHelpers.removeItem('absentStudents');
      })
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
              hidden={attendanceTaken !== true}
            >
              Attendance has been taken!!!
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
                  Via Roll Numbers
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab} className="mt-3">
              <TabPane tabId="1">
                <Students
                  absentStudents={props.absentStudents}
                  standardId={props.standardId}
                  attendanceTaken={attendanceTaken}
                />
              </TabPane>
            </TabContent>

            <TabContent activeTab={activeTab} className="mt-3">
              <TabPane tabId="2">
                <Texter
                  disabled={attendanceTaken}
                  absentStudents={props.absentStudents}
                  standardId={props.standardId}
                />
              </TabPane>
            </TabContent>
          </Card>
        </Col>
      </Row>

      <div className="m-5 text-center">
        <ConfirmationButton
          className={buttonClasses()}
          students={props.absentStudents}
          onConfirm={submitAttendance}
          color="success"
          disabled={attendanceTaken === undefined || attendanceTaken === true}
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

export default Attendance;
