import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'reactstrap';

import StudentCard from './studentCard';

const Students = props => (
  <div className="container">
    <Row>
      <Col md="2" />
      <Col md="8">
        <Card body outline color="secondary">
          <Row>
            <Col sm="8" md="11">
              {
                props.students.students.map(student => (
                  <StudentCard
                    key={student.roll_no}
                    disabled={props.attendanceTaken}
                    isAbsent={props.absentStudents.indexOf(student.roll_no) >= 0}
                    {...student}
                  />
                ))
              }
            </Col>

            <Col sm="4" md="1" />
          </Row>
        </Card>
      </Col>
    </Row>
  </div>
);

const mapStateToProps = state => ({
  students: state.students,
  absentStudents: state.absentStudents,
});

Students.defaultProps = {
  attendanceTaken: false,
};

Students.propTypes = {
  students: PropTypes.shape({
    students: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      roll_no: PropTypes.number.isRequired,
    })),
  }).isRequired,
  absentStudents: PropTypes.arrayOf(PropTypes.number).isRequired,
  attendanceTaken: PropTypes.bool,
};

export default connect(mapStateToProps, null)(Students);
