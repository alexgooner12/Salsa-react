import { combineReducers } from 'redux';
import { danceListReducer } from './danceListReducer';
import { groupListReducer } from './groupListReducer';
import { scheduleListReducer } from './scheduleListReducer';
import { memberListReducer } from './memberListReducer';
import { paymentListReducer } from './paymentListReducer';
import { attendanceListReducer } from './attendanceListReducer';
import { firestoreReducer } from 'redux-firestore';

export const rootReducer = combineReducers({
  danceList: danceListReducer,
  groupList: groupListReducer,
  scheduleList: scheduleListReducer,
  memberList: memberListReducer,
  paymentList: paymentListReducer,
  attendanceList: attendanceListReducer,
  firestore: firestoreReducer
})
