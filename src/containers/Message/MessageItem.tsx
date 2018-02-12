import Comment from 'components/Comment';
import { IItem } from 'containers/Message/types';
import * as React from 'react';

export interface IMessageItemProps {
  item: IItem;
  name: string;
}

export default class MessageItem extends React.PureComponent<
  IMessageItemProps,
  {}
> {
  public render() {
    const { item: { date, text }, name } = this.props;

    return <Comment date={new Date(date)} name={name} text={text} />;
  }
}
