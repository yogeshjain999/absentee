import storageHelpers from './storageHelpers';

const sessionHelpers = {
  getUserFrom: response => ({
    jwtToken: response.headers['x-user-jwt-token'],
    authToken: response.headers['x-user-auth-token'],
  }),

  logIn: user => storageHelpers.setItem('currentUser', user),
  logOut: () => storageHelpers.removeItem('currentUser'),
  currentUser: () => storageHelpers.getItem('currentUser'),
};

export default sessionHelpers;
