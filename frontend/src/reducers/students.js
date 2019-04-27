import * as actions from '../actionTypes';

const students = (state = { students: [], attendance_taken: undefined }, action) => {
  switch (action.type) {
    case actions.IMPORT_STUDENTS:
      return action.list;
    default:
      return state;
  }
};

export default students;
