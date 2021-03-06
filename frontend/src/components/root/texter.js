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
            disabled={props.disabled}
            type="textarea"
            name="text"
            id="numbers"
            rows={10}
            value={absentStudents}
            onChange={e => setAbsentStudents(e.target.value)}
            onBlur={() => props.bulkAbsentee(absentStudents.split(',').map(i => parseInt(i, 10)).filter(i => !Number.isNaN(i)), props.standardId)}
            placeholder="Please enter Roll numbers of absent students ONLY (For eg: 1, 2, 3)"
          />
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  bulkAbsentee(array, standardId) {
    dispatch(attendanceActions.bulkAbsentee(array, standardId));
  },
});

Texter.defaultProps = {
  disabled: true,
};

Texter.propTypes = {
  disabled: PropTypes.bool,
  absentStudents: PropTypes.arrayOf(PropTypes.number).isRequired,
  bulkAbsentee: PropTypes.func.isRequired,
  standardId: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(Texter);
