import * as actions from '../actionTypes';

const standards = (state = [], action) => {
  switch (action.type) {
    case actions.IMPORT_STANDARDS:
      return action.list;
    default:
      return state;
  }
};

export default standards;
