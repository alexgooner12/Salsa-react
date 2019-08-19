import { ADD_DANCE_MOVE, DELETE_DANCE_MOVE, EDIT_DANCE_MOVE } from '../actions/danceListActions';

export function danceListReducer(state = [], action) {
    switch (action.type) {
        case ADD_DANCE_MOVE:
            return [
                ...state, {
                    name: action.payload.newDanceMove.name,
                    difficulty: action.payload.newDanceMove.difficulty,
                    id: action.payload.id
                }
            ]

        case EDIT_DANCE_MOVE:
            return state.map(danceMove => danceMove.id === action.payload.id ? action.payload.updatedDanceMove : danceMove);

        case DELETE_DANCE_MOVE:
            return state.filter(danceMove => danceMove.id !== action.payload.id);

        default:
            return state;
    }
}