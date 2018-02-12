import { AnyAction } from 'redux';
import {
  ADD_MESSAGE_FAILED,
  ADD_MESSAGE_SUCCEEDED,
  FILTER_CHANGED,
  FORM_CHANGED,
  GET_MESSAGES_FAILED,
  GET_MESSAGES_SUCCEEDED,
} from './MessageContants';
import { IMessageState } from './types';

export const initialState: IMessageState = {
  filterId: 'all',
  form: {
    isPrivate: true,
    text: '',
  },
  list: [],
};

function messageReducer(state = initialState, action: AnyAction) {
  switch (action.type) {
    case ADD_MESSAGE_SUCCEEDED:
      return {
        ...state,
        form: initialState.form,
        list: [...state.list, action.message],
      };

    case GET_MESSAGES_SUCCEEDED:
      return { ...state, list: action.list };

    case FILTER_CHANGED:
      return { ...state, filterId: action.filterId };

    case FORM_CHANGED:
      return {
        ...state,
        form: { ...state.form, [action.fieldName]: action.value },
      };

    case ADD_MESSAGE_FAILED:
    case GET_MESSAGES_FAILED:
      const { message } = action;

      alert(message);
      return state;

    default:
      return state;
  }
}

export default messageReducer;
