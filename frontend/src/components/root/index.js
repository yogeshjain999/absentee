import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Api from '../../api';
import studentsActions from '../../actionCreators/students';

import StandardSelector from './standardSelector';
import Attendance from './attendance';

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
