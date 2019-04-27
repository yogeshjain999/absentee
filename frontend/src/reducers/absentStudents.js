import * as actions from '../actionTypes';

import storageHelpers from '../utils/storageHelpers';

const students = (state = {}, action) => {
  const standardId = action.student && action.student.standardId;

  switch (action.type) {
    case actions.MARK_ABSENT: {
      const newStdState = { [standardId]: [...(state[standardId] || []), action.student.roll_no] };
      const newState = { ...state, ...newStdState };
      storageHelpers.setItem('absentStudents', newState);
      return newState;
    }
    case actions.MARK_PRESENT: {
      const newStdState = state[standardId].filter(s => s !== action.student.roll_no);
      const newState = { ...state, ...{ [standardId]: newStdState } };

      storageHelpers.setItem('absentStudents', newState);
      return newState;
    }
    case actions.BULK_ABSENTEE: {
      const newState = { ...state, [action.standardId]: action.array };

      storageHelpers.setItem('absentStudents', newState);
      return newState;
    }
    default:
      return state;
  }
};

export default students;
