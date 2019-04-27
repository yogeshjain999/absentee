import axios from 'axios';
import { toast } from 'react-toastify';

import sessionHelpers from './utils/sessionHelpers';
import * as routes from './routes';

const axiosInitializer = {
  load: () => {
    axios.defaults.baseURL = routes.SERVICE_URL;

    // Request interceptor
    axios.interceptors.request.use((config) => {
      const currentUser = sessionHelpers.currentUser();
      if (currentUser) {
        config.headers['X-User-Auth-Token'] = currentUser.authToken;
        config.headers['X-User-Jwt-Token'] = currentUser.jwtToken;
      }

      return config;
    }, error => Promise.reject(error));


    axios.interceptors.response.use((response) => {
      if (response.data && response.data.message) {
        toast.success(response.data.message);
      }

      return response;
    }, (error) => {
      if (!error.response) {
        toast.error('Server is not reachable');
      }

      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }

      const currentUser = sessionHelpers.currentUser();

      if (currentUser && error.response && error.response.status === 401) {
        sessionHelpers.logOut();
        window.location.href = routes.LOGIN_URL; // eslint-disable-line
      }

      return Promise.reject(error);
    });
  },
};

export default axiosInitializer;
