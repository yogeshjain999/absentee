import * as actions from '../actionTypes';

const currentUserActions = {
  logIn: user => ({ type: actions.SET_CURRENT_USER, user }),
};

export default currentUserActions;
