import { ADD_ATTENDANCE, DELETE_ATTENDANCE, TOGGLE_ATTENDANT, EDIT_ATTENDANT, EDIT_ATTENDANCE } from '../actions/attendanceListActions';

export function attendanceListReducer(state = [], action) {
    switch (action.type) {
      case ADD_ATTENDANCE:
        return [
          ...state, {
            date: action.payload.attendance.date,
            group: action.payload.attendance.group,
            possibleAttendants: action.payload.attendance.possibleAttendants,
            danceMoves: action.payload.attendance.danceMoves,
            scheduleId: action.payload.attendance.scheduleId,
            id: action.payload.id,
            month: action.payload.attendance.month
          }
      ];

      case EDIT_ATTENDANCE:
        return state.map(attendance => attendance.id === action.payload.id ? action.payload.updatedAttendance : attendance);

      case DELETE_ATTENDANCE:
        return state.filter(attendance => attendance.id !== action.payload.id);

      case TOGGLE_ATTENDANT: 
        return state.map(attendance => attendance.id === action.payload.id ? action.payload.updatedAttendance : attendance);

      case EDIT_ATTENDANT: 
        return state.map(attendance => attendance.scheduleId === action.payload.updatedAttendance.scheduleId ? action.payload.updatedAttendance : attendance);

      default:
        return state;
    }
  }  