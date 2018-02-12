import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import Form from 'components/Form';
import Textarea from 'components/Textarea';
import { IRootState } from 'constants/types';
import { addMessage, formChanged } from 'containers/Message/MessageActions';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { IForm } from './types';

type IStateProps = IForm;

interface IDispatchProps {
  onFormChange: (fieldName: string, value: boolean | string) => void;
  onValid: () => void;
}

type IMessageAddFormProps = IStateProps & IDispatchProps & InjectedIntlProps;

class MessageAddForm extends React.PureComponent<IMessageAddFormProps, {}> {
  public render() {
    const { intl: { formatMessage }, form: { isPrivate, text } } = this.props;

    return (
      <div className="c-message__add-form">
        <Form className="u-m-bottom--x-small">
          <Checkbox
            checked={isPrivate}
            label={formatMessage({ id: 'Message.privateCheckboxLabel' })}
            onChange={this.handleCheckboxFieldChange}
          />
          <Textarea
            onChange={this.handleTextFieldChange('text')}
            placeholder={formatMessage({ id: 'Message.textareaPlaceholder' })}
            value={text}
          />
        </Form>
        <Button onClick={this.handleValidForm} variant="neutral">
          <FormattedMessage id="Message.addMessageButtonLabel" />
        </Button>
      </div>
    );
  }

  private handleCheckboxFieldChange = () => {
    const { form: { isPrivate }, onFormChange } = this.props;

    onFormChange('isPrivate', !isPrivate);
  };

  private handleTextFieldChange = (fieldName: string) => (value: string) => {
    const { onFormChange } = this.props;

    onFormChange(fieldName, value);
  };

  private handleValidForm = () => {
    const { onValid } = this.props;

    onValid();
  };
}

const mapStateToProps = (state: IRootState): IStateProps => ({
  form: state.message.form,
});

const mapDispatchToProps = (
  dispatch: Dispatch<IRootState>
): IDispatchProps => ({
  onFormChange: bindActionCreators(formChanged, dispatch),
  onValid: bindActionCreators(addMessage, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withIntl = injectIntl(MessageAddForm);

export default withConnect(withIntl);
