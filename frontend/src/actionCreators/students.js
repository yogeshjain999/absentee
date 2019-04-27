import * as actions from '../actionTypes';

const studentActions = {
  markPresent: student => ({ type: actions.MARK_PRESENT, student }),
  markAbsent: student => ({ type: actions.MARK_ABSENT, student }),
  bulkAbsentee: array => ({ type: actions.BULK_ABSENTEE, array }),
};

export default studentActions;
