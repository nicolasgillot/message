import {
  ADD_MESSAGE_REQUESTED,
  FILTER_CHANGED,
  FORM_CHANGED,
  GET_MESSAGES_REQUESTED,
} from 'containers/Message/MessageContants';

export function addMessage() {
  return {
    type: ADD_MESSAGE_REQUESTED,
  };
}

export function filterChanged(filterId: string) {
  return {
    filterId,
    type: FILTER_CHANGED,
  };
}

export function formChanged(fieldName: string, value: boolean | string) {
  return {
    fieldName,
    type: FORM_CHANGED,
    value,
  };
}

export function getMessages() {
  return {
    type: GET_MESSAGES_REQUESTED,
  };
}
