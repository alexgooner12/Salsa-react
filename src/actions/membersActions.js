import { db } from '../config/firebase';
import { addPayer, createPayer, editPayer, disablePayer, restorePayer } from './paymentListActions';
import { editAttendant } from './attendanceListActions';

export const ADD_MEMBER = 'ADD_MEMBER';
export const EDIT_MEMBER = 'EDIT_MEMBER';
export const DISABLE_MEMBER = 'DISABLE_MEMBER';
export const RESTORE_MEMBER = 'RESTORE_MEMBER';
export const SORT_MEMBERS = 'SORT_MEMBERS';

export const ADD_DANCE_MOVES_TO_ATTENDANT = 'ADD_DANCE_MOVES_TO_ATTENDANT';
export const REMOVE_DANCE_MOVES_FROM_ATTENDANT = 'REMOVE_DANCE_MOVES_FROM_ATTENDANT';

export const addMember = newMember => dispatch => {
    db.collection('memberList').add({ ...newMember }).then(docRef => {
        dispatch({ type: ADD_MEMBER, payload: { newMember, id: docRef.id } });
        return  createPayer(newMember, docRef);
        }).then(newPayer => addPayer(newPayer, dispatch));
};

export const editMember = (id, updatedMember) => dispatch => {
    db.collection('memberList').doc(id).update({ ...updatedMember }).then(() => {
        dispatch({ type: EDIT_MEMBER, payload: { id, updatedMember } });
        }).then(() => editPayer(updatedMember, dispatch)).then(() => editAttendant(updatedMember, dispatch));
};

export const disableMember = id => dispatch => {
    db.collection('memberList').doc(id).update({ isDisabled: true }).then(() => {
        dispatch({ type: DISABLE_MEMBER, payload: { id } });
        }).then(() => disablePayer(id, dispatch));
};

export const restoreMember = id => dispatch => {
    db.collection('memberList').doc(id).update({
        isDisabled: false
    }).then(() => {
        dispatch({ type: RESTORE_MEMBER, payload: { id } });
    }).then(() => restorePayer(id, dispatch));
};

export const sortMembers = sortingCriterium => dispatch => {
    dispatch({ type: SORT_MEMBERS, payload: { sortingCriterium } });
}

export const addDanceMovesToAttendant = (attendant, danceMoves) => dispatch => {
    dispatch({ type: ADD_DANCE_MOVES_TO_ATTENDANT, payload: { attendant, danceMoves } });
}

export const removeDanceMovesFromAttendant = (attendant, danceMoves) => dispatch => {
    dispatch({ type: REMOVE_DANCE_MOVES_FROM_ATTENDANT, payload: { attendant, danceMoves } });
}
