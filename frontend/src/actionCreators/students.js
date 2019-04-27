import * as actions from '../actionTypes';

const studentsActions = {
  import: list => ({ type: actions.IMPORT_STUDENTS, list }),
};

export default studentsActions;
