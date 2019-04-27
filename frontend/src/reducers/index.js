import { createStore, combineReducers } from 'redux';

import storageHelpers from '../utils/storageHelpers';

import currentUser from './currentUser';
import students from './students';
import absentStudents from './absentStudents';

const app = combineReducers({
  currentUser,
  students,
  absentStudents,
});

const persistedState = {
  currentUser: storageHelpers.getItem('currentUser'),
  absentStudents: storageHelpers.getItem('absentStudents'),
};

const store = createStore(app, persistedState);

export default store;
