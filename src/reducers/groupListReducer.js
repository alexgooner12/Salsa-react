import { ADD_GROUP, DELETE_GROUP, EDIT_GROUP } from '../actions/groupListActions';

export function groupListReducer(state = [], action) {
    switch (action.type) {
        case ADD_GROUP:
            return [
                ...state, {
                    name: action.payload.newGroup.name,
                    id: action.payload.id
                }
            ]

        case EDIT_GROUP:
            return state.map(group => group.id === action.payload.id ? action.payload.updatedGroup : group);

        case DELETE_GROUP:
            return state.filter(group => group.id !== action.payload.id);

        default:
            return state;
    }
}