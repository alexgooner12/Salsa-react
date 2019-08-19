import { ADD_MEMBER, DISABLE_MEMBER, EDIT_MEMBER, RESTORE_MEMBER, SORT_MEMBERS, ADD_DANCE_MOVES_TO_ATTENDANT, REMOVE_DANCE_MOVES_FROM_ATTENDANT } from '../actions/membersActions';

export function memberListReducer(state = [], action) {
    switch (action.type) {
        case ADD_MEMBER:
            return [
                ...state, {
                    group: action.payload.newMember.group,
                    id: action.payload.id,
                    name: action.payload.newMember.name,
                    gender: action.payload.newMember.gender,
                    foundOutFrom: action.payload.newMember.foundOutFrom,
                    startDate: action.payload.newMember.startDate,
                    danceMoves: action.payload.newMember.danceMoves,
                    isDisabled: action.payload.newMember.isDisabled
                }
            ]

        case EDIT_MEMBER:
            return state.map(member => member.id === action.payload.id ? action.payload.updatedMember : member);

        case DISABLE_MEMBER:
            return state.map(member => member.id === action.payload.id ? Object.assign({}, { ...member, isDisabled: !member.isDisabled }) : member);

        case RESTORE_MEMBER:
            return state.map(member => member.id === action.payload.id ? Object.assign({}, { ...member, isDisabled: !member.isDisabled }) : member);

        case SORT_MEMBERS:
            const memberListCopy = Array.from(state);
            return memberListCopy.sort((a, b) => (a[action.payload.sortingCriterium] > b[action.payload.sortingCriterium]) ? -1 : 1);

        case ADD_DANCE_MOVES_TO_ATTENDANT:
            return state.map(member => member.id === action.payload.attendant.id ? Object.assign({}, { ...member, danceMoves: [...member.danceMoves, ...action.payload.danceMoves.filter(danceMove => !member.danceMoves.includes(danceMove))] }) : member);

        case REMOVE_DANCE_MOVES_FROM_ATTENDANT:
            return state.map(member => member.id === action.payload.attendant.id ? Object.assign({}, { ...member, danceMoves: member.danceMoves.filter(danceMove => !action.payload.danceMoves.includes(danceMove))}) : member);
            
        default: 
            return state;
    }
}