import { db } from '../config/firebase';
import { createAttendance, addAttendance, editAttendance, deleteAttendance } from './attendanceListActions';

export const ADD_SCHEDULE = 'ADD_SCHEDULE';
export const EDIT_SCHEDULE = 'EDIT_SCHEDULE';
export const DELETE_SCHEDULE = 'DELETE_SCHEDULE';

export const addSchedule = schedule => (dispatch, getState) => {
    db.collection('scheduleList').add({
        ...schedule
    }).then(docRef => {
        dispatch({ type: ADD_SCHEDULE, payload: { schedule, id: docRef.id } });
        return createAttendance(schedule, getState, docRef.id);
    }).then(attendance => addAttendance(attendance, dispatch));
};

export const deleteSchedule = id => dispatch => {
    db.collection('scheduleList').doc(id).delete().then(() => {
        dispatch({ type: DELETE_SCHEDULE, payload: { id } });
    }).then(() => deleteAttendance(id, dispatch));
};

export const editSchedule = (id, updatedSchedule) => (dispatch, getState) => {
    db.collection('scheduleList').doc(id).update({
        ...updatedSchedule
    }).then(() => {
        dispatch({ type: EDIT_SCHEDULE, payload: { id, updatedSchedule } });
        return createAttendance(updatedSchedule, getState, id);
    }).then(updatedAttendance => editAttendance(updatedAttendance, dispatch));
};
