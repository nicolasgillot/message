import { IMessageState } from 'containers/Message/types';

export interface IUser {
  id: number;
  name: string;
}

export interface IRootState {
  message: IMessageState;
  user: IUser;
}
