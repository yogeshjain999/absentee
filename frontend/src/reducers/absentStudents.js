import * as actions from '../actionTypes';

import storageHelpers from '../utils/storageHelpers';

const students = (state = [], action) => {
  switch (action.type) {
    case actions.MARK_ABSENT: {
      const newState = [...state, action.student.roll_no];
      storageHelpers.setItem('absentStudents', newState);
      return newState;
    }
    case actions.MARK_PRESENT: {
      const newState = state.filter(s => s !== action.student.roll_no);
      storageHelpers.setItem('absentStudents', newState);
      return newState;
    }
    case actions.BULK_ABSENTEE: {
      storageHelpers.setItem('absentStudents', action.array);
      return [...action.array];
    }
    default:
      return state;
  }
};

export default students;
