import * as actions from '../actionTypes';

const list = [
  { name: 'Priyanka Yadav', roll_no: 1 },
  { name: 'Payal Bhalerao', roll_no: 2 },
  { name: 'Anil Kumar', roll_no: 3 },
  { name: 'Akshay Birajdar', roll_no: 4 },
];

const students = (state = list, action) => {
  switch (action.type) {
    case actions.LOAD_STUDENTS:
      return action.students;
    default:
      return state;
  }
};

export default students;
