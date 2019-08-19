import { db } from '../config/firebase';

export const ADD_DANCE_MOVE = 'ADD_DANCE_MOVE';
export const EDIT_DANCE_MOVE = 'EDIT_DANCE_MOVE';
export const DELETE_DANCE_MOVE = 'DELETE_DANCE_MOVE';

export const addDanceMove = newDanceMove => dispatch => {
    db.collection('danceList').add({
        ...newDanceMove
    }).then(docRef => {
        dispatch({ type: ADD_DANCE_MOVE, payload: { newDanceMove, id: docRef.id } });
    }).catch((error) => console.log(error))
};

export const deleteDanceMove = id => dispatch => {
    db.collection('danceList').doc(id).delete().then(() => {
        dispatch({ type: DELETE_DANCE_MOVE, payload: { id } });
    }).catch((error) => console.log(error));
};

export const editDanceMove = (id, updatedDanceMove) => dispatch => {
    db.collection('danceList').doc(id).update({
        ...updatedDanceMove
    }).then(() => {
        dispatch({ type: EDIT_DANCE_MOVE, payload: { id, updatedDanceMove } });
    }).catch((error) => console.log(error));
};
