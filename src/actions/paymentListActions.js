import { db } from '../config/firebase';
import { months } from '../constants/months';

export const ADD_PAYER = 'ADD_PAYER';
export const EDIT_PAYER = 'EDIT_PAYER';
export const DISABLE_PAYER = 'DISABLE_PAYER';
export const RESTORE_PAYER = 'RESTORE_PAYER';
export const TOGGLE_PAYMENT = 'TOGGLE_PAYMENT';

export const togglePayment = updatedPayer => dispatch => {
    db.collection('paymentList').doc(updatedPayer.id).update({ ...updatedPayer }).then(() =>
        dispatch({ type: TOGGLE_PAYMENT, payload: { updatedPayer } })
    );
}

export const addPayer = (newPayer, dispatch) => {
    db.collection('paymentList').add(newPayer).then(docRef =>
        dispatch({ type: ADD_PAYER, payload: { newPayer, id: docRef.id } })).catch(error =>
            console.log(error));
}

export const createPayer = (newMember, docRef) => {
    const monthsAfterRegistration = getMonthsAfterRegistration(newMember);
    return Object.assign({}, { name: newMember.name, isDisabled: false, payments: monthsAfterRegistration.map(month => Object.assign({}, { month: month, hasPaid: false })), memberId: docRef.id });
}

export const getMonthsAfterRegistration = member => {
    const indexOfMonthOfRegistration = new Date(member.startDate).getMonth();
    return months.slice(indexOfMonthOfRegistration);
}

export const editPayer = (updatedMember, dispatch) => {
    db.collection("paymentList").get().then(querySnapshot => querySnapshot.forEach(doc => {
        if (doc.data().memberId === updatedMember.id) {
            const updatedPayer = Object.assign({}, { ...doc.data(), id: doc.id, name: updatedMember.name });
            db.collection('paymentList').doc(doc.id).update(updatedPayer).then(() =>
                dispatch({ type: EDIT_PAYER, payload: { id: doc.id, updatedPayer } })
            );
        }
    }));
}

export const disablePayer = (memberId, dispatch) => {
    db.collection("paymentList").get().then(querySnapshot => querySnapshot.forEach(doc => {
        if (doc.data().memberId === memberId) {
            db.collection('paymentList').doc(doc.id).update({ isDisabled: true }).then(() =>
                dispatch({ type: DISABLE_PAYER, payload: { id: doc.id } })
            );
        }
    }));
}

export const restorePayer = (memberId, dispatch) => {
    db.collection("paymentList").get().then(querySnapshot => querySnapshot.forEach(doc => {
        if (doc.data().memberId === memberId) {
            db.collection('paymentList').doc(doc.id).update({ isDisabled: false }).then(() =>
                dispatch({ type: RESTORE_PAYER, payload: { id: doc.id } })
            );
        }
    }));
}