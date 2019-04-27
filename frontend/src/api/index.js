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

  standards() {
    return axios.get(routes.STANDARDS_API);
  },

  students(standardId) {
    return axios.get(`${routes.STUDENTS_API}?standard_id=${standardId}`);
  },

  submitAttendance(rollNumbers, standardId) {
    return axios.post(routes.ATTENDANCE_API, {
      roll_numbers: rollNumbers,
      standard_id: standardId,
      date: new Date(),
    });
  },
};

export default Api;
