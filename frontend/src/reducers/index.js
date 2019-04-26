import { createStore, combineReducers } from 'redux';

import storageHelpers from '../utils/storageHelpers';

import currentUser from './currentUser';

const app = combineReducers({
  currentUser,
});

const persistedState = {
  currentUser: storageHelpers.getItem('currentUser'),
};

const store = createStore(app, persistedState);

export default store;
