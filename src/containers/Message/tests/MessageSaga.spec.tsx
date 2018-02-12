import { expect } from 'chai';
import { ADD_MESSAGE_SUCCEEDED } from 'containers/Message/MessageContants';
import { addMessage } from 'containers/Message/MessageSaga';
import { getIsPrivate, getText } from 'containers/Message/MessageSelectors';
import { call, put, select } from 'redux-saga/effects';
import { getUserId } from 'selectors';
import WebApi from 'services/WebApi';

describe('MessageSaga', () => {
  it('should addMessage yield an Effect call', () => {
    const addMessageIterator = addMessage();
    const date = '2018-02-11T08:44:40.491Z';
    const id = 1;
    const isPrivate = false;
    const text = 'Text';
    const userId = 1;
    const expected = {
      message: {
        date,
        id,
        private: isPrivate,
        text,
        userId,
      },
      type: ADD_MESSAGE_SUCCEEDED,
    };

    expect(addMessageIterator.next().value).to.deep.equal(select(getIsPrivate));
    expect(addMessageIterator.next(isPrivate).value).to.deep.equal(
      select(getText)
    );
    expect(addMessageIterator.next(text).value).to.deep.equal(
      select(getUserId)
    );
    expect(addMessageIterator.next(userId).value).to.deep.equal(
      call(WebApi.addMessage, userId, text, isPrivate)
    );
    expect(addMessageIterator.next({ data: { date, id } }).value).to.deep.equal(
      put(expected)
    );
  });
});
