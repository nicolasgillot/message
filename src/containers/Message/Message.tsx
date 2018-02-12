import Form from 'components/Form';
import Radio, { RadioGroup } from 'components/Radio';
import { IRootState, IUser } from 'constants/types';
import 'containers/Message/Message.css';
import { filterChanged, getMessages } from 'containers/Message/MessageActions';
import MessageAddForm from 'containers/Message/MessageAddForm';
import MessageItem, { IMessageItemProps } from 'containers/Message/MessageItem';
import MessageReducer from 'containers/Message/MessageReducer';
import MessageSaga from 'containers/Message/MessageSaga';
import { IList } from 'containers/Message/types';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators, compose, Dispatch } from 'redux';
import injectReducer from 'services/injectReducer';
import injectSaga from 'services/injectSaga';

type IStateProps = IList & { user: IUser };

interface IDispatchProps {
  onFilterChange: (value: string) => void;
  onGetMessages: () => void;
}

export type IMessageProps = IStateProps & IDispatchProps & InjectedIntlProps;

export class Message extends React.PureComponent<IMessageProps, {}> {
  public componentWillMount() {
    const { onGetMessages } = this.props;

    onGetMessages();
  }

  public render() {
    const {
      filterId,
      intl: { formatMessage },
      list,
      user: { name },
    } = this.props;

    return (
      <div className="c-message">
        <Form className="u-m-bottom--medium" variant="inline">
          <RadioGroup
            checkedId={filterId}
            label="Filter"
            name="filter"
            onChange={this.handleFilterChange}
          >
            <Radio
              id="all"
              label={formatMessage({ id: 'Message.filter.all' })}
            />
            <Radio
              id="public"
              label={formatMessage({ id: 'Message.filter.public' })}
            />
            <Radio
              id="private"
              label={formatMessage({ id: 'Message.filter.private' })}
            />
          </RadioGroup>
        </Form>
        <ul className="o-list--ordered u-m-left--none">
          {list.reduce(
            (
              previous: Array<React.ReactElement<IMessageItemProps>>,
              messageItem
            ) =>
              filterId === 'all' ||
              (filterId === 'private' && messageItem.private) ||
              (filterId === 'public' && !messageItem.private)
                ? [
                    ...previous,
                    <MessageItem
                      key={messageItem.id}
                      item={messageItem}
                      name={name}
                    />,
                  ]
                : previous,
            []
          )}
        </ul>
        <MessageAddForm />
      </div>
    );
  }

  private handleFilterChange = (id: string) => {
    const { onFilterChange } = this.props;

    onFilterChange(id);
  };
}

const mapStateToProps = (state: IRootState): IStateProps => ({
  filterId: state.message.filterId,
  list: state.message.list,
  user: state.user,
});

const mapDispatchToProps = (
  dispatch: Dispatch<IRootState>
): IDispatchProps => ({
  onFilterChange: bindActionCreators(filterChanged, dispatch),
  onGetMessages: bindActionCreators(getMessages, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({
  key: 'message',
  reducer: MessageReducer,
});
const withSaga = injectSaga({
  key: 'message',
  saga: MessageSaga,
});

const withIntl = injectIntl(Message);

export default compose(withReducer, withSaga, withConnect)(withIntl);
