import { ADD_SCHEDULE, DELETE_SCHEDULE, EDIT_SCHEDULE } from '../actions/scheduleListActions';

export function scheduleListReducer(state = [], action) {
    switch (action.type) {
        case ADD_SCHEDULE:
            return [
                ...state, {
                    group: action.payload.schedule.group,
                    date: action.payload.schedule.date,
                    danceMoves: action.payload.schedule.danceMoves,
                    id: action.payload.id
                }
            ]
            
        case EDIT_SCHEDULE:
            return state.map(schedule => schedule.id === action.payload.id ? action.payload.updatedSchedule : schedule);

        case DELETE_SCHEDULE:
            return state.filter(schedule => schedule.id !== action.payload.id);

        default:
            return state;
    }
}