import { ADD_PAYER, DISABLE_PAYER, RESTORE_PAYER, TOGGLE_PAYMENT, EDIT_PAYER } from '../actions/paymentListActions';

export function paymentListReducer(state = [], action) {
    switch (action.type) {
      case ADD_PAYER:
        return [
          ...state, {
            name: action.payload.newPayer.name,
            isDisabled: action.payload.newPayer.isDisabled,
            payments: action.payload.newPayer.payments,
            memberId: action.payload.newPayer.memberId,
            id: action.payload.id
          }
      ]

      case EDIT_PAYER:
        return state.map(payer => payer.id === action.payload.id ? action.payload.updatedPayer : payer);

      case DISABLE_PAYER: 
        return state.map(payer => payer.id === action.payload.id ? Object.assign({}, { ...payer, isDisabled: true }) : payer);

      case RESTORE_PAYER: 
        return state.map(payer => payer.id === action.payload.id ? Object.assign({}, { ...payer, isDisabled: false }) : payer);

      case TOGGLE_PAYMENT: 
        return state.map(payer => payer.id === action.payload.updatedPayer.id ? action.payload.updatedPayer : payer);

      default:
        return state;
    }
  }  