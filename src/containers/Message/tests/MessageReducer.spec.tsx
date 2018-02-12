import { expect } from 'chai';
import {
  ADD_MESSAGE_SUCCEEDED,
  FORM_CHANGED,
  GET_MESSAGES_SUCCEEDED,
} from 'containers/Message/MessageContants';
import MessageReducer, {
  initialState,
} from 'containers/Message/MessageReducer';

describe('MessageReducer', () => {
  it('should return the initial state', () => {
    expect(MessageReducer(undefined, {} as any)).to.eql({
      filterId: 'all',
      form: {
        isPrivate: true,
        text: '',
      },
      list: [],
    });
  });

  it('should handle ADD_MESSAGE_SUCCEEDED', () => {
    const message = {
      date: '2018-02-11T08:44:40.491Z',
      id: 1,
      private: false,
      text: 'New Message',
      userId: 1,
    };

    expect(
      MessageReducer(undefined, {
        message,
        type: ADD_MESSAGE_SUCCEEDED,
      })
    ).to.eql({ ...initialState, list: [message] });
  });

  it('should handle FORM_CHANGED', () => {
    const fieldName = 'text';
    const value = 'New Item Name';

    expect(
      MessageReducer(undefined, {
        fieldName,
        type: FORM_CHANGED,
        value,
      })
    ).to.eql({ ...initialState, form: { ...initialState.form, text: value } });
  });

  it('should handle GET_MESSAGES_SUCCEEDED', () => {
    const list = [
      {
        date: '2018-02-11T08:44:40.491Z',
        id: 1,
        private: false,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        userId: 1,
      },
      {
        date: '2018-02-11T09:05:21.567Z',
        id: 2,
        private: true,
        text: 'Donec at egestas mauris, volutpat aliquet elit.',
        userId: 1,
      },
      {
        date: '2018-02-11T11:30:12.294Z',
        id: 3,
        private: false,
        text: 'Maecenas in nunc interdum risus mollis semper.',
        userId: 1,
      },
    ];

    expect(
      MessageReducer(undefined, {
        list,
        type: GET_MESSAGES_SUCCEEDED,
      })
    ).to.eql({ ...initialState, list });
  });
});
