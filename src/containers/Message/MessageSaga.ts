import {
  ADD_MESSAGE_FAILED,
  ADD_MESSAGE_REQUESTED,
  ADD_MESSAGE_SUCCEEDED,
  GET_MESSAGES_FAILED,
  GET_MESSAGES_REQUESTED,
  GET_MESSAGES_SUCCEEDED,
} from 'containers/Message/MessageContants';
import { getIsPrivate, getText } from 'containers/Message/MessageSelectors';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';
import { getUserId } from 'selectors';
import WebApi from 'services/WebApi';

export function* addMessage() {
  const isPrivate = yield select(getIsPrivate);
  const text = yield select(getText);
  const userId = yield select(getUserId);

  try {
    const { data: { date, id } } = yield call(
      WebApi.addMessage,
      userId,
      text,
      isPrivate
    );

    yield put({
      message: { date, id, private: isPrivate, text, userId },
      type: ADD_MESSAGE_SUCCEEDED,
    });
  } catch ({ message }) {
    yield put({ message, type: ADD_MESSAGE_FAILED });
  }
}

export function* getMessages() {
  try {
    const { data } = yield call(WebApi.getMessages);

    yield put({ list: data, type: GET_MESSAGES_SUCCEEDED });
  } catch ({ message }) {
    yield put({ message, type: GET_MESSAGES_FAILED });
  }
}

export default function* messageSaga() {
  yield all([
    takeEvery(ADD_MESSAGE_REQUESTED, addMessage),
    takeEvery(GET_MESSAGES_REQUESTED, getMessages),
  ]);
}
