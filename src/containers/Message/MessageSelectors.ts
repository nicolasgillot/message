import { IRootState } from 'constants/types';

export const getIsPrivate = ({ message }: IRootState): boolean =>
  message.form.isPrivate;

export const getText = ({ message }: IRootState): string => message.form.text;
