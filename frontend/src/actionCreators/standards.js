import * as actions from '../actionTypes';

const standardActions = {
  import: list => ({ type: actions.IMPORT_STANDARDS, list }),
};

export default standardActions;
