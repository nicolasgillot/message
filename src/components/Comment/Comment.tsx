/**
 * A feed consists of a list of recurring elements of similar types.
 * Examples of a feed would be a discussion feed.
 */
import * as React from 'react';
import { FormattedDate } from 'react-intl';
import './Comment.css';

interface ICommentProps {
  date?: Date;
  name?: string;
  text?: string;
}

interface IDefaultProps {
  date: Date;
  name: string;
}

type PropsWithDefaults = ICommentProps & IDefaultProps;

export default class Comment extends React.PureComponent<
  PropsWithDefaults,
  {}
> {
  public static defaultProps: IDefaultProps = {
    date: new Date(),
    name: 'No name',
  };

  public render() {
    const { date, name, text } = this.props;

    return (
      <article className="c-comment o-media">
        <div className="o-media__body">
          <header className="o-media o-media--center">
            <div className="o-grid o-grid--align-spread has-flexi-truncate">
              <p className="u-truncate">{name}</p>
            </div>
          </header>
          <div className="c-comment__content text-longform">{text}</div>
          <footer>
            <ul className="o-list--horizontal has-dividers--right u-text-body--small">
              <li className="o-item">
                <FormattedDate
                  day="2-digit"
                  hour="2-digit"
                  month="2-digit"
                  minute="2-digit"
                  value={date}
                  year="numeric"
                />
              </li>
            </ul>
          </footer>
        </div>
      </article>
    );
  }
}
