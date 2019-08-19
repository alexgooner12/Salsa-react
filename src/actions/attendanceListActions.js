import { db } from '../config/firebase';
import { months } from '../constants/months';
import { ADD_DANCE_MOVES_TO_ATTENDANT, REMOVE_DANCE_MOVES_FROM_ATTENDANT } from '../actions/membersActions';

export const ADD_ATTENDANCE = 'ADD_ATTENDANCE';
export const EDIT_ATTENDANCE = 'EDIT_ATTENDANCE';
export const DELETE_ATTENDANCE = 'DELETE_ATTENDANCE';
export const TOGGLE_ATTENDANT = 'TOGGLE_ATTENDANT';
export const EDIT_ATTENDANT = 'EDIT_ATTENDANT';

export const addAttendance = (attendance, dispatch) => {
    db.collection('attendanceList').add({ ...attendance }).then(docRef => 
        dispatch({ type: ADD_ATTENDANCE, payload: { attendance, id: docRef.id } }));
}

export const createAttendance = (schedule, getState, scheduleId) => {
    const month = months[new Date(schedule.date).getMonth()];
    const memberList = getState().memberList;
    const possibleAttendants = getPossibleAttendants(memberList, schedule);
    return Object.assign({}, { ...schedule, month, possibleAttendants, scheduleId });
}

export const getPossibleAttendants = (list, schedule) => {
    return list.filter(member => getAvailableMembers(member, schedule))
        .map(availableMember => createPossibleAttendants(availableMember, schedule));
}

export const getAvailableMembers = (member, schedule) => {
    const scheduleDate = new Date(schedule.date);
    const memberStartDate = new Date(member.startDate);
    if (member.group === schedule.group && memberStartDate <= scheduleDate) {
        return member;
    }
}

export const createPossibleAttendants = (member, schedule) => {
    return Object.assign({}, { name: member.name, id: member.id, date: schedule.date, hasAttended: false });
}

export const deleteAttendance = (id, dispatch) => {
    db.collection("attendanceList").get().then(querySnapshot => querySnapshot.forEach(doc => {
        if (doc.data().scheduleId === id) {
            db.collection('attendanceList').doc(doc.id).delete().then(() => {
                dispatch({ type: DELETE_ATTENDANCE, payload: { id: doc.id } });
            })
        }
    }));
}

export const editAttendant = (updatedMember, dispatch) => {
    db.collection("attendanceList").get().then(querySnapshot => querySnapshot.forEach(doc => {
        const possibleAttendantsArr = Array.from(doc.data().possibleAttendants);
        const attendantBeingEdited = possibleAttendantsArr.find(possibleAttendant => possibleAttendant.id === updatedMember.id);
        if (attendantBeingEdited) {
            const updatedAttendant = Object.assign({}, { ...attendantBeingEdited, name: updatedMember.name });
            const updatedPossibleAttendants = possibleAttendantsArr.map(possibleAttendant => possibleAttendant.id === updatedAttendant.id ? updatedAttendant : possibleAttendant);
            const updatedAttendance = Object.assign({}, {...doc.data(), possibleAttendants: updatedPossibleAttendants });
            db.collection('attendanceList').doc(doc.id).update(updatedAttendance).then(() => {
                dispatch({ type: EDIT_ATTENDANT, payload: { updatedAttendance }});
            });
        }
    }));
}

export const editAttendance = (updatedAttendance, dispatch) => {
    db.collection("attendanceList").get().then(querySnapshot => querySnapshot.forEach(doc => {
        if (doc.data().scheduleId === updatedAttendance.id) {
            const updatedAttendanceWithFirebaseId = Object.assign({}, { ...updatedAttendance, id: doc.id });
            db.collection('attendanceList').doc(doc.id).update({ ...updatedAttendance }).then(() => {
                dispatch({ type: EDIT_ATTENDANCE, payload: { id: doc.id, updatedAttendance: updatedAttendanceWithFirebaseId } });
            })
        }
    }));
}

export const toggleAttendant = (updatedAttendance, updatedAttendant) => dispatch => { handleToggleAttendant(updatedAttendance, updatedAttendant, dispatch) };

function handleToggleAttendant(updatedAttendance, updatedAttendant, dispatch) {
    updatedAttendant.hasAttended ? handleAttendantWhenPresent(updatedAttendance, updatedAttendant, dispatch) : handleAttendantWhenAbsent(updatedAttendance, updatedAttendant, dispatch);
}

function handleAttendantWhenPresent(updatedAttendance, updatedAttendant, dispatch) {
    setAttendantPresence(updatedAttendance, dispatch).then(() =>
        addDanceMovesToMember(updatedAttendant, updatedAttendance, dispatch));
}

function setAttendantPresence(updatedAttendance, dispatch) {
    return db.collection('attendanceList').doc(updatedAttendance.id).update(updatedAttendance).then(() => {
        dispatch({ type: TOGGLE_ATTENDANT, payload: { updatedAttendance } });
    });
}

function addDanceMovesToMember(updatedAttendant, updatedAttendance, dispatch) {
    db.collection('memberList').doc(updatedAttendant.id).update({
        danceMoves: updatedAttendance.danceMoves
    }).then(() => {
        dispatch({ type: ADD_DANCE_MOVES_TO_ATTENDANT, payload: { attendant: updatedAttendant, danceMoves: updatedAttendance.danceMoves } });
    });
}

function handleAttendantWhenAbsent(updatedAttendance, updatedAttendant, dispatch) {
    setAttendantPresence(updatedAttendance, dispatch).then(() =>
        removeDanceMovesFromMember(updatedAttendant, updatedAttendance, dispatch));
}


function removeDanceMovesFromMember(updatedAttendant, updatedAttendance, dispatch) {
    const newDanceMoves = getMemberNewDanceMoves(updatedAttendant, updatedAttendance);
    db.collection('memberList').doc(updatedAttendant.id).update({
        danceMoves: newDanceMoves
    }).then(() => {
        dispatch({ type: REMOVE_DANCE_MOVES_FROM_ATTENDANT, payload: { attendant: updatedAttendant, danceMoves: updatedAttendance.danceMoves } });
    });
}

function getMemberNewDanceMoves(updatedAttendant, updatedAttendance) {
    let newDanceMoves = [];
    db.collection('memberList').get().then(querySnapshot =>
        querySnapshot.forEach(doc => {
            if (doc.id === updatedAttendant.id) {
                newDanceMoves = doc.data().danceMoves.filter(danceMove => !updatedAttendance.danceMoves.includes(danceMove));
            }
        })
    );
    return newDanceMoves;
}