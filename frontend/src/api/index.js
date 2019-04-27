import axios from 'axios';

import * as routes from '../routes';

const Api = {
  logIn(mobileNumber, password) {
    return axios.post(routes.LOGIN_API, {
      mobile_number: mobileNumber,
      password,
    });
  },

  logOut() {
    return axios.delete(routes.LOGOUT_API);
  },
};

export default Api;
