import { createStore, combineReducers } from 'redux';

import storageHelpers from '../utils/storageHelpers';

const app = combineReducers({
});

const persistedState = {
  currentUser: storageHelpers.getItem('currentUser'),
};

const store = createStore(app, persistedState);

export default store;
