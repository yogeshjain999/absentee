import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Input } from 'reactstrap';

import attendanceActions from '../../actionCreators/attendance';

const Texter = (props) => {
  const [absentStudents, setAbsentStudents] = useState(props.absentStudents.join(', '));

  useEffect(() => {
    setAbsentStudents(props.absentStudents.join(', '));
  }, [props.absentStudents]);

  return (
    <div className="container">
      <Row>
        <Col md="2" />
        <Col md="8">
          <Input
            type="textarea"
            name="text"
            id="numbers"
            rows={10}
            value={absentStudents}
            onChange={e => setAbsentStudents(e.target.value)}
            onBlur={() => props.bulkAbsentee(absentStudents.split(',').map(i => parseInt(i, 10)).filter(i => !Number.isNaN(i)))}
            placeholder="Please enter roll numbers of absent students (For eg: 1, 2, 3)"
          />
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = state => ({
  absentStudents: state.absentStudents,
});

const mapDispatchToProps = dispatch => ({
  bulkAbsentee(array) {
    dispatch(attendanceActions.bulkAbsentee(array));
  },
});

Texter.propTypes = {
  absentStudents: PropTypes.arrayOf(PropTypes.number).isRequired,
  bulkAbsentee: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Texter);
