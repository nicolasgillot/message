import { IRootState } from 'constants/types';
import { Action, combineReducers, Reducer, ReducersMapObject } from 'redux';

const userInitialState = {
  id: 1,
  name: 'Nicolas GILLOT',
};

function userReducer(state = userInitialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default function createReducer(
  injectedReducers?: ReducersMapObject
): Reducer<IRootState> {
  return combineReducers<IRootState>({
    user: userReducer,
    ...injectedReducers,
  });
}
