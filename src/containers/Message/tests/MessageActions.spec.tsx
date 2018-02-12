import { expect } from 'chai';
import {
  addMessage,
  formChanged,
  getMessages,
} from 'containers/Message/MessageActions';
import {
  ADD_MESSAGE_REQUESTED,
  FORM_CHANGED,
  GET_MESSAGES_REQUESTED,
} from 'containers/Message/MessageContants';

describe('MessageActions', () => {
  it('should create an action to add an item', () => {
    const expectedAction = {
      type: ADD_MESSAGE_REQUESTED,
    };

    expect(addMessage()).to.eql(expectedAction);
  });

  it('should create an action when the form changed', () => {
    const fieldName = 'text';
    const value = 'Field Value';
    const expectedAction = {
      fieldName,
      type: FORM_CHANGED,
      value,
    };

    expect(formChanged(fieldName, value)).to.eql(expectedAction);
  });

  it('should create an action to get the list', () => {
    const expectedAction = {
      type: GET_MESSAGES_REQUESTED,
    };

    expect(getMessages()).to.eql(expectedAction);
  });
});
