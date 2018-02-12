import { IRootState } from 'constants/types';

export const getUserId = ({ user }: IRootState): number => user.id;
