import { db } from '../config/firebase';

export const ADD_GROUP = 'ADD_GROUP';
export const EDIT_GROUP = 'EDIT_GROUP';
export const DELETE_GROUP = 'DELETE_GROUP';

export const addGroup = newGroup => dispatch => {
    db.collection('groupList').add({
        ...newGroup
    }).then(docRef => {
        dispatch({ type: ADD_GROUP, payload: { newGroup, id: docRef.id } });
    }).catch((error) => console.log(error))
};

export const deleteGroup = id => dispatch => {
    db.collection('groupList').doc(id).delete().then(() => {
        dispatch({ type: DELETE_GROUP, payload: { id } });
    }).catch((error) => console.log(error));
};

export const editGroup = (id, updatedGroup) => dispatch => {
    db.collection('groupList').doc(id).update({
        ...updatedGroup
    }).then(() => {
        dispatch({ type: EDIT_GROUP, payload: { id, updatedGroup } });
    }).catch((error) => console.log(error));
};


